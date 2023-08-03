'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import Title, { Subtitle } from './title';
import { ROUTES } from '@/common/constants';

export default function Aside() {
  const router = useRouter();
  return (
    <aside className="px-6 py-12 flex flex-col gap-4  bg-primary">
      <img
        src="./aura-logo.png"
        alt="aura-logo"
        className="h-[80px] mx-auto object-cover mb-12"
      />
      {ROUTES.map((category, i: number) => (
        <Title
          key={i}
          onClick={() => category.url && router.push(category.url)}
          Icon={category.Icon}
          title={category.title}
          url={category.url}>
          {category?.subTitle?.map((item, j: number) => (
            <Subtitle
              key={j}
              url={item.url}>
              {item.name}
            </Subtitle>
          ))}
        </Title>
      ))}
    </aside>
  );
}
