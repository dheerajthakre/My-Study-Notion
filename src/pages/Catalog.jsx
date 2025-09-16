import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCatalogaPageData } from "../services/operations/pageAndComponentData"
import { apiConnector } from "../services/apiConnector"
import { categories } from "../services/apis"
import Error from "./Error"

function Catalog() {
  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  //Fetch all categories
  useEffect(() => {
    const getCategories = async() => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      const category_id = res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
      setCategoryId(category_id);
      console.log(category_id)
    }
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async() => {
      try {
        const res = await getCatalogaPageData(categoryId);
        console.log("PRinting res: ", res);
        setCatalogPageData(res);
        //console.log("page data",res);
       } 
       catch (error) {
        console.log(error);
        
      }
    }
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  if(loading || !catalogPageData) {
    return (
      <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
        <div className='spinner'></div>
      </div>
    )
  }
  if(!loading && !catalogPageData.success) {
    return <Error />
  }

  return (
    <div>
      {/* Hero Section */}
      <div className='box-content bg-richblack-800 px-4'>
        <div className='mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent'>
          <p className='text-sm text-richblack-300'>
            {`Home / Catalog / `}
            <span className='text-yellow-25'>
              { catalogPageData?.data?.selectedCategory.name }
            </span>
          </p>
          <p>
            { catalogPageData}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Catalog
