import React from 'react'
import Filter from './Filter'
import Content from './Content'

export default function CommonSearch() {
  return (
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <Filter/>
            </div>
         
            <div class="col-md-8">
              <Content/>
            </div>
        </div>
    </div>
  )
}
