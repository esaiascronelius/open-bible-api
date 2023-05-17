import { readFile, readdir } from 'fs/promises'
import type BookMetadata from '../types/BookMetadata.d'
import Chapter from './chapter.js'

class Book {
  name: string
  abbreviation: string
  chapters: Map<number, Chapter>

  constructor(metadata: BookMetadata, chapters: Chapter[]) {
    this.name = metadata.name
    this.abbreviation = metadata.abbreviation
    this.chapters = new Map<number, Chapter>(chapters.map((chapter) => [chapter.number, chapter]))
  }

  /**
   * Load all books from the filesystem.
   *
   * @param translationPath The path to the translation directory.
   * @returns {Promise<Book[]>} Promise that resolves with the loaded books.
   */
  static async loadBooks(translationPath: string): Promise<Book[]> {
    const dirEntries = await readdir(translationPath, { withFileTypes: true })
    const dirs = dirEntries.filter((dirent) => dirent.isDirectory())
    const dirNames = dirs.map((dirent) => dirent.name)

    return await Promise.all(dirNames.map(async (dirName) => Book.loadBook(translationPath, dirName)))
  }

  /**
   * Load a book from the filesystem.
   *
   * @param translationPath The path to the translation directory.
   * @param name The name of the book directory.
   * @returns {Promise<Book>} Promise that resolves with the loaded book.
   */
  static async loadBook(translationPath: string, name: string): Promise<Book> {
    const bookPath = `${translationPath}/${name}`
    const metadataPath = `${bookPath}/metadata.json`
    const metadata = JSON.parse(await readFile(metadataPath, 'utf-8')) as BookMetadata
    const chapters = await Chapter.loadChapters(bookPath)

    return new Book(metadata, chapters)
  }
}

export default Book
