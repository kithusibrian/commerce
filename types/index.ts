import { z } from "zod"
import { ProductInputSchema } from "@/lib/validator"
export type IProductInput = z.infer<typeof ProductInputSchema>
import {
  CartSchema,
  OrderItemSchema,
  UserInputSchema,
  UserSignInSchema,
  UserSignUpSchema,
  ShippingAddressSchema,
  OrderInputSchema,

} from '@/lib/validator'

export type Data = {
    users: IUserInput[]
    products: IProductInput[]
    headerMenus: {
      name: string
      href: string
    }[]
    carousels: {
      image: string
      url: string
      title: string
      buttonCaption: string
      isPublished: boolean
    }[]
  }
  export type IOrderInput = z.infer<typeof OrderInputSchema>

export type OrderItem = z.infer<typeof OrderItemSchema>
export type Cart = z.infer<typeof CartSchema>
export type ShippingAddress = z.infer<typeof ShippingAddressSchema>

// user
export type IUserInput = z.infer<typeof UserInputSchema>
export type IUserSignIn = z.infer<typeof UserSignInSchema>
export type IUserSignUp = z.infer<typeof UserSignUpSchema>