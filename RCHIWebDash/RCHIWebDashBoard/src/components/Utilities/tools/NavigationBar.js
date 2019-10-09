import React from 'react'
import { Pagination } from 'semantic-ui-react'

const PaginationNavBar= ({totalPages, changed}) => (
    <Pagination
      defaultActivePage={1}
      firstItem={null}
      lastItem={null}
      pointing
      secondary
      totalPages={totalPages}
      onPageChange={changed}
    />
  )
  
  export default PaginationNavBar