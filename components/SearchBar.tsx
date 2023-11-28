'use client'

import Image from "next/image"
import { SearchManufacturer } from "."
import React, { useState } from "react"
import { useRouter } from "next/navigation"

const SearchButton = ({otherClasses}: {otherClasses: string}) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image 
      src='/magnifying-glass.svg'
      alt="magnifying glass"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
)

const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState('')
  const [model, setModel] = useState('');
  const router = useRouter();

  const handlSearch = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(manufacturer === '' && model == ''){
      return alert('Please fill in the search bar')
    }
    
    updateSearchParams(
      model.toLowerCase(),
      manufacturer.toLowerCase()
    )
  }
  const updateSearchParams = (model: string, manufacturer: string)=>{
    const searchhParams = new URLSearchParams(window.location.search)

    if(model){
      searchhParams.set('model', model)
    }else {
      searchhParams.delete('model')
    }

    if(manufacturer){
      searchhParams.set('manufacturer', manufacturer)
    }else {
      searchhParams.delete('manufacturer')
    }

    const newPathname = `${window.location.pathname}?${searchhParams.toString()}`

    router.push(newPathname, { scroll: false }) 
  }
  return (
    <form className="searchbar" onSubmit={handlSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
          />
        <SearchButton otherClasses="sm:hidden"/>
      </div>
      <div className="searchbar__item">
        <Image
          src='/model-icon.png'
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4 "
          alt="car model"
        />
        <input 
          type="text"
          name="model"
          value={model}
          onChange={(e)=> setModel(e.target.value)}
          placeholder="Tiguan"
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden"/>
      </div>
      <SearchButton otherClasses="max-sm:hidden"/>
    </form>
  )
}

export default SearchBar
