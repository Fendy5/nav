export type NavItemProp = {
  name: string
  url: string
  desc: string
  categoryId: string
  logo: string
}

export type CategoryProp = {
  name: string
  uuid: string
  logo_url: string
  userId?: string
}

export type TagProp = {
  id: number
  name: string
}

export type ToolFormProp = {
  name: string
  url: string
  logo: string
  desc: string
  category_id: string
  user_id?: string
  image?: { fileList }
}

export type ToolProp = {
  id: string
  name: string
  url: string
  logo: string
  desc: string
  category_id: string
  user_id?: string
}
