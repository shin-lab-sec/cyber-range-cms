import { Breadcrumbs as MantineBreadcrumbs } from '@mantine/core'
import Link from 'next/link'
import { FC } from 'react'

export type Item = {
  title: string
  href: string
}

type Props = {
  items: Item[]
}

// Linkにする
// 選択してる、現在の位置で色変える？
// 現在地なら押せないようにする？

export const Breadcrumbs: FC<Props> = ({ items }) => {
  const breadcrumbsItem = items.map((item, index) => (
    <>
      {items.length - 1 === index ? (
        <span key={index} className='text-gray-500'>
          {item.title}
        </span>
      ) : (
        <Link
          href={item.href}
          key={index}
          className='text-blue-500 no-underline'
        >
          {item.title}
        </Link>
      )}
    </>
  ))

  return (
    <MantineBreadcrumbs className='h-40px overflow-x-auto'>
      {breadcrumbsItem}
    </MantineBreadcrumbs>
  )
}
