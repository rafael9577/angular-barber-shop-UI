
export interface SaveClientRequest {
  name: string
  email: string
  phone: string
}

export interface UpdateClientRequest {
  name: string
  email: string
  phone: string
}

export interface SaveClientReponse {
  id: number
  name: string
  email: string
  phone: string
}
export interface UpdatelientReponse {
  id: number
  name: string
  email: string
  phone: string
}
export interface ListClientReponse {
  id: number
  name: string
  email: string
  phone: string
}
export interface DetailClientReponse {
  id: number
  name: string
  email: string
  phone: string
}
