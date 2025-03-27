'use client'
import BrowsingHistoryList from '@/components/shared/browsing-history-list'
import ProductPrice from '@/components/shared/product/product-price'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useCartStore from '@/hooks/use-cart-store'
import { APP_NAME, FREE_SHIPPING_MIN_PRICE } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function CartPage() {
  const {
    cart: { items, itemsPrice },
    updateItem,
    removeItem,
  } = useCartStore()
  const router = useRouter()
  
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {items.length === 0 ? (
          <Card className="col-span-4 rounded-xl bg-white shadow-xl transition-all hover:shadow-2xl">
            <CardHeader className="border-b pb-4 text-center">
              <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
                Your Shopping Cart is empty
              </h1>
            </CardHeader>
            <CardContent className="pt-4 text-center">
              <p className="text-lg text-gray-600">
                Continue shopping on{' '}
                <Link
                  href="/"
                  className="font-semibold text-blue-600 underline-offset-4 hover:underline"
                >
                  {APP_NAME}
                </Link>
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="lg:col-span-3">
              <Card className="overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl">
                <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                  <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                    Shopping Cart
                  </h1>
                </CardHeader>
                <CardContent className="divide-y divide-gray-100 p-0">
                  {items.map((item) => (
                    <div
                      key={item.clientId}
                      className="flex flex-col items-center gap-6 bg-white p-6 transition-all hover:bg-gray-50 md:flex-row"
                    >
                      <Link
                        href={`/product/${item.slug}`}
                        className="group relative h-40 w-40 shrink-0 overflow-hidden rounded-lg border border-gray-200"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="20vw"
                          className="object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </Link>

                      <div className="flex-1 space-y-3">
                        <Link
                          href={`/product/${item.slug}`}
                          className="block text-lg font-semibold text-gray-800 transition-colors hover:text-blue-600"
                        >
                          {item.name}
                        </Link>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>
                            <span className="font-medium">Color:</span> {item.color}
                          </p>
                          <p>
                            <span className="font-medium">Size:</span> {item.size}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <Select
                            value={item.quantity.toString()}
                            onValueChange={(value) => updateItem(item, Number(value))}
                          >
                            <SelectTrigger className="w-24 border-gray-300 bg-white shadow-sm hover:border-blue-400 hover:shadow-md transition-all">
                              <SelectValue>Qty: {item.quantity}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: item.countInStock }).map((_, i) => (
                                <SelectItem
                                  key={i + 1}
                                  value={`${i + 1}`}
                                  className="hover:bg-gray-50"
                                >
                                  {i + 1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            variant="outline"
                            className="relative overflow-hidden border-red-200 bg-white px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-all duration-300 group"
                            onClick={() => removeItem(item)}
                          >
                            <span className="relative z-10">Remove</span>
                            <span className="absolute inset-0 bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-x-0 group-hover:scale-x-100 origin-left"></span>
                            <span className="ml-2 inline-block group-hover:animate-shake">🗑️</span>
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        {item.quantity > 1 && (
                          <div className="text-sm text-gray-500">
                            {item.quantity} × <ProductPrice price={item.price} plain />
                          </div>
                        )}
                        <div className="text-xl font-bold text-green-600">
                          <ProductPrice price={item.price * item.quantity} plain />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 text-right">
                    <div className="inline-flex items-center rounded-lg bg-white px-4 py-3 shadow-sm">
                      <span className="text-lg font-semibold text-gray-800">
                        Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} Items):
                      </span>
                      <span className="ml-2 text-xl font-bold text-green-600">
                        <ProductPrice price={itemsPrice} plain />
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="rounded-xl bg-white shadow-lg transition-all hover:shadow-xl">
                <CardContent className="space-y-6 p-6">
                  {itemsPrice < FREE_SHIPPING_MIN_PRICE ? (
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm">
                      Add{' '}
                      <span className="font-semibold text-blue-700">
                        <ProductPrice price={FREE_SHIPPING_MIN_PRICE - itemsPrice} plain />
                      </span>{' '}
                      more to qualify for{' '}
                      <span className="font-bold text-green-600">FREE Shipping</span>.
                    </div>
                  ) : (
                    <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
                      🎉 Your order qualifies for{' '}
                      <span className="font-bold">FREE Shipping</span>!
                    </div>
                  )}
                  <div className="space-y-4">
                    <div className="flex justify-between text-lg font-semibold text-gray-800">
                      <span>Subtotal:</span>
                      <span className="text-green-600">
                        <ProductPrice price={itemsPrice} plain />
                      </span>
                    </div>
                    <Button
                      onClick={() => router.push('/checkout')}
                      className="glow-effect relative overflow-hidden w-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-lg font-semibold text-white shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-500 group"
                    >
                      <span className="relative z-10">Proceed to Checkout</span>
                      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>
                      <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
                    </Button>
                    <p className="text-center text-sm text-gray-500">
                      or{' '}
                      <Link
                        href="/"
                        className="font-medium text-blue-600 underline-offset-4 hover:underline"
                      >
                        Continue Shopping
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
      <BrowsingHistoryList className="mt-12" />
    </div>
  )
}