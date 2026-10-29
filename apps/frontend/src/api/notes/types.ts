export interface Note {
  id: string
  groupId: string
  text: string
  date: string
  createdAt: string
}

export interface CreateNoteDto {
  text: string
  date: string
}

export interface UpdateNoteDto {
  text?: string
  date?: string
}