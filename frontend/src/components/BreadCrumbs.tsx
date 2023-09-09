import { Breadcrumbs as DefaultBreadcrumbs } from '@mantine/core'
import Link from 'next/link'
import { FC, useMemo } from 'react'

export type Item = { title: string; href: string }

type Props = {
  items: Item[]
}

export const BreadCrumbs: FC<Props> = ({ items }) => {
  const breadcrumbsItems = useMemo(() => {
    return items.map((item, i) => {
      // 最後の要素はLinkにしない
      if (i === items.length - 1) {
        return <p key={item.title}>{item.title}</p>
      }

      return (
        <Link href={item.href} key={item.title}>
          {item.title}
        </Link>
      )
    })
  }, [items])

  return <DefaultBreadcrumbs>{breadcrumbsItems}</DefaultBreadcrumbs>
}
