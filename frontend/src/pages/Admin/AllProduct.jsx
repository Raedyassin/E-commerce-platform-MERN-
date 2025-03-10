import { Link } from 'react-router-dom'
import moment from 'moment'
import { useAllProductsQuery } from '../../redux/apis/productApiSlice'
import Loader from "../../components/Loader";
import AdminMenu from './AdminMenu';
export default function AllProduct() {
  
  const { data: products, isLoading, isError } = useAllProductsQuery()
  console.log(products)
  
  if (isLoading) return <Loader />;
  if (isError) return <div>Error Loading Products</div>;

  


  return (
    <>
      <div className="container  mr-[9rem]">
        <div className="flex flex-col md:flex-row">
          <div className="p-3">
            <div className=" text-xl font-black h-12">
              All Products ({products.data.products.length})
            </div>
            <div className="flex flex-wrap justify-around items-center">
              {products.data.products.map((product) => (
                <Link
                  key={product._id}
                  to={`/admin/product/update/${product._id}`}
                  className="block bg-gray-50 rounded-lg p-4 mb-4 overflow-hidden "
                >
                  <div className="flex">
                    <img
                      src={`/${product.img}`}
                      alt={product.name}
                      className="w-[10rem] object-cover"
                    />
                    <div className="p-4 flex flex-col justify-around">
                      <div className="flex justify-between">
                        <h5 className="text-xl font-semibold mb-2">
                          {product.name}
                        </h5>
                        <p className="text-gray-400 text-sm">
                          {moment(product.createdAt).format("MMMM Do YYYY")}
                        </p>
                      </div>

                      <p className="text-gray-400 xl:w-[30rem]  md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                        {product.discription.substring(0, 160)}...
                      </p>

                      <div className="flex justify-between">
                        <Link
                          to={`/admin/product/update/${product._id}`}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                        >
                          Update Product
                          <svg
                            className="w-3.5 h-3.5 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </Link>{" "}
                        <p>$ {product.price}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="md:w-1/4 p-3 mt-2 ">
            <AdminMenu />
          </div>
        </div>
      </div>
    </>
  );
}
