import React, { useState } from 'react'
import Filter from './Filter'
import Content from './Content'

export default function CommonSearch() {
  const [listAirline, setListAirline] = useState([]);
  const [filterAirline, setFilterAirline] = useState([]);
  const [filterPrice, setFilterPrice] = useState(null);
  const [filterTime, setFilterTime] = useState(null);
  return (
    <div class="container">
        <div class="row">
            <div class="col-md-4">
            <Filter listAirline={listAirline} setFilterAirline={setFilterAirline} /> 
            </div>
            <div class="col-md-8">
            <Content setListAirline={setListAirline} filterAirline={filterAirline} />
            </div>
        </div>
    </div>
  )
}
