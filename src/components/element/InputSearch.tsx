import React from 'react'
import Image from "next/image";
import searchIcon from "@/../public/icons/searchIcon.svg"
import { InputSearchT } from '@/types/def';

export default function InputSearch({ placeholder, value, onChange,  }: InputSearchT) {
  return (
    <label className='input-search'>
        <Image src={searchIcon} alt='searchIcon' width={24} height={24} />
        <input placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  )
}
