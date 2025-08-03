export type PurchaseStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED'

export interface Purchase {
  id: string
  userId: string
  programId: string
  amount: number
  status: PurchaseStatus
  webpayToken?: string | null
  webpayUrl?: string | null
  createdAt: Date
  updatedAt: Date
  user: {
    id: string
    name: string | null
    email: string
  }
  program: {
    id: string
    title: string
    pdfUrl?: string | null
  }
}

export interface CreatePurchaseData {
  programId: string
  amount: number
}

export interface WebPayTransaction {
  token: string
  url: string
  amount: number
}

export interface WebPayResponse {
  token: string
  url: string
} 