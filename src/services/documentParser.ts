import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Set the worker source for PDF.js with a more reliable CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface ParsedDocument {
  text: string;
  pageCount?: number;
  wordCount: number;
  fileName: string;
}

export class DocumentParser {
  /**
   * Parse a PDF file and extract all text content
   */
  static async parsePDF(file: File): Promise<ParsedDocument> {
    try {
      console.log(`Starting PDF parsing for: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
      
      const arrayBuffer = await file.arrayBuffer();
      
      // Try to load the PDF document
      let pdf;
      try {
        pdf = await pdfjsLib.getDocument({ 
          data: arrayBuffer,
          verbosity: 0 // Reduce console output
        }).promise;
      } catch (pdfError) {
        console.error('PDF loading error:', pdfError);
        throw new Error(`Cannot load PDF: ${pdfError instanceof Error ? pdfError.message : 'Invalid PDF format'}`);
      }
      
      let fullText = '';
      const totalPages = pdf.numPages;
      console.log(`PDF loaded successfully. Pages: ${totalPages}`);

      // Extract text from all pages with progress tracking
      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        try {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          
          // Combine all text items from the page with proper spacing
          const pageText = textContent.items
            .map((item: any) => {
              if (item.str && item.str.trim()) {
                return item.str;
              }
              return '';
            })
            .filter(text => text.length > 0)
            .join(' ');
          
          if (pageText.trim()) {
            fullText += pageText + '\n\n';
          }
          
          // Log progress for large documents
          if (totalPages > 10 && pageNum % 5 === 0) {
            console.log(`Processed ${pageNum}/${totalPages} pages`);
          }
        } catch (pageError) {
          console.warn(`Error processing page ${pageNum}:`, pageError);
          // Continue with other pages instead of failing completely
          fullText += `[Error reading page ${pageNum}]\n\n`;
        }
      }

      const cleanedText = fullText.trim();
      if (!cleanedText || cleanedText.length < 50) {
        throw new Error('No readable text found in PDF. The document might be scanned or password-protected.');
      }

      console.log(`PDF parsing completed. Extracted ${this.countWords(cleanedText)} words`);

      return {
        text: cleanedText,
        pageCount: totalPages,
        wordCount: this.countWords(cleanedText),
        fileName: file.name
      };
    } catch (error) {
      console.error('Error parsing PDF:', error);
      throw new Error(`Failed to parse PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Parse a DOCX file and extract text content
   */
  static async parseDOCX(file: File): Promise<ParsedDocument> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      
      return {
        text: result.value,
        wordCount: this.countWords(result.value),
        fileName: file.name
      };
    } catch (error) {
      console.error('Error parsing DOCX:', error);
      throw new Error(`Failed to parse DOCX: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Parse a DOC file (older format) - fallback to plain text extraction
   */
  static async parseDOC(file: File): Promise<ParsedDocument> {
    try {
      // For older DOC files, mammoth should still work
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      
      return {
        text: result.value,
        wordCount: this.countWords(result.value),
        fileName: file.name
      };
    } catch (error) {
      console.error('Error parsing DOC:', error);
      throw new Error(`Failed to parse DOC: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Parse a plain text file
   */
  static async parseTXT(file: File): Promise<ParsedDocument> {
    try {
      const text = await file.text();
      
      return {
        text,
        wordCount: this.countWords(text),
        fileName: file.name
      };
    } catch (error) {
      console.error('Error parsing TXT:', error);
      throw new Error(`Failed to parse text file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Main parsing function that determines file type and uses appropriate parser
   */
  static async parseDocument(file: File): Promise<ParsedDocument> {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    switch (fileExtension) {
      case 'pdf':
        return this.parsePDF(file);
      case 'docx':
        return this.parseDOCX(file);
      case 'doc':
        return this.parseDOC(file);
      case 'txt':
        return this.parseTXT(file);
      default:
        throw new Error(`Unsupported file type: ${fileExtension}`);
    }
  }

  /**
   * Count words in text
   */
  private static countWords(text: string): number {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  /**
   * Split text into chunks for API processing
   */
  static chunkText(text: string, maxChunkSize: number = 4000): string[] {
    if (text.length <= maxChunkSize) {
      return [text];
    }

    const chunks: string[] = [];
    const sentences = text.split(/[.!?]+\s+/);
    let currentChunk = '';

    for (const sentence of sentences) {
      const trimmedSentence = sentence.trim();
      if (!trimmedSentence) continue;

      // If adding this sentence would exceed the limit, save current chunk and start new one
      if (currentChunk.length + trimmedSentence.length + 2 > maxChunkSize && currentChunk.length > 0) {
        chunks.push(currentChunk.trim());
        currentChunk = trimmedSentence + '. ';
      } else {
        currentChunk += trimmedSentence + '. ';
      }
    }

    // Add the last chunk if it has content
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }

    return chunks.length > 0 ? chunks : [text]; // Fallback to original text if no chunks created
  }

  /**
   * Validate file before parsing
   */
  static validateFile(file: File): { isValid: boolean; error?: string } {
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = ['pdf', 'doc', 'docx', 'txt'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (!fileExtension || !allowedTypes.includes(fileExtension)) {
      return {
        isValid: false,
        error: `Unsupported file type. Please upload: ${allowedTypes.join(', ').toUpperCase()}`
      };
    }

    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'File size too large. Maximum size is 50MB.'
      };
    }

    return { isValid: true };
  }
}