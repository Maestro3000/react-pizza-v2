import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const FullPizza = () => {

  const [ pizza, setPizza ] = useState()
  const {id} = useParams()
  const navigate = useNavigate()
  useEffect( () => {
    async function fetchPizza() {
      try {
        const {data} = await axios.get( `https://66ff45472b9aac9c997ebe81.mockapi.io/items/` + id )
        setPizza( data )
      } catch (error) {
        alert( "Ошибка при получении пиццы" )
        navigate( "/" )
      }
    }

    fetchPizza()
  }, [] );

  if ( !pizza ) {
    return "loading..."
  }

  return (

    <div className="container">
      <img src={ pizza.imageUrl } alt=""/>
      <h2>{ pizza.title }</h2>
      <h4>{ pizza.price } P</h4>
    </div>

  )
}