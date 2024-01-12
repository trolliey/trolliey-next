import React, {
  useEffect,
  useState,
  ReactElement,
  useContext,
  useRef,
} from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline'
import { Store } from '../../Context/Store'
import { useRouter } from 'next/router'
import axios from 'axios'
import { getError } from '../../utils/error'
import ProductLoading from '../ProductItem/ProductLoading'
import ProductItem from '../ProductItem/ProductItem'
import slugify from '../../utils/slugify'
import { apiUrl } from '../../utils/apiUrl'

interface Props {
  cols?: any
  no_text?: any
  category?: any
}

function RelatedProducts({ cols, no_text, category }: Props): ReactElement {
  const { dispatch } = useContext(Store)
  const history = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [products, setProducts] = useState<any>()

  useEffect(() => {
    setLoading(true)
    const get_related = async () => {
      try {
        const { data } = await axios.post(
          `${apiUrl}/api/products?page=${1}&category=${slugify(
            category
          )}&page=${1}`,
          {
            query: category,
          }
        )
        setLoading(false)
        setProducts(data?.products)
      } catch (error) {
        setLoading(false)
        setError(getError(error))
      }
    }
    get_related()
  }, [category, dispatch])
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollAmount = 400

  const handleScroll = (scrollOffset: number) => {
    const newPosition = scrollPosition + scrollOffset

    if (containerRef.current) {
      // Calculate the maximum scroll position based on content width and container width
      const maxScrollPosition =
        containerRef.current.scrollWidth - containerRef.current.clientWidth || 0

      // Ensure newPosition doesn't go beyond limits
      const newScrollPosition = Math.max(
        0,
        Math.min(newPosition, maxScrollPosition)
      )

      setScrollPosition(newScrollPosition)
      containerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      })

      // containerRef.current.scrollLeft = newScrollPosition
    }
  }

  return (
    <div className="items w-full flex-col rounded bg-white px-4 pb-8 md:px-8">
      <div className="flex flex-row items-center justify-between py-4 text-sm md:py-8 md:text-lg">
        <p className="font-semibold capitalize text-gray-700 ">
          related products - {category}
        </p>
        {!no_text && (
          <div
            onClick={() => history.push('/explore')}
            className="flex cursor-pointer flex-row items-center font-semibold capitalize text-new-primary hover:text-new-light"
          >
            View all
            <ArrowRightIcon height={16} width={16} className="ml-2" />
          </div>
        )}
      </div>
      <div className="w-full">
        {loading ? (
          <>
            <div
              className={`${
                cols ? cols : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5'
              } mx-auto hidden w-full gap-4 rounded-lg md:grid  md:gap-8`}
            >
              {[1, 2, 3, 4, 5]?.map((product: any, index: number) => (
                <div key={index} className="col-span-1 p-0">
                  <ProductLoading />
                </div>
              ))}
            </div>
            <div
              className={`${
                cols ? cols : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5'
              } mx-auto grid w-full gap-4 rounded-lg md:hidden  md:gap-8`}
            >
              {[1, 2]?.map((product: any, index: number) => (
                <div key={index} className="col-span-1 p-0">
                  <ProductLoading />
                </div>
              ))}
            </div>
          </>
        ) : error ? (
          <p className="min-h-96 w-full py-8 text-center text-gray-700">
            Could not load products, Try reloading the page!{' '}
          </p>
        ) : (
          <div
            className={`${
              loading || error
                ? 'flex w-full flex-1 '
                : `grid ${
                    cols ? cols : 'lg:grid-cols-5 '
                  } grid-cols-2 md:grid-cols-3`
            }  relative gap-4`}
          >
            <div className="absolute top-[50%]  right-0 left-0 hidden justify-between md:flex ">
              <button
                disabled={scrollPosition === 0}
                className={
                  scrollPosition === 0
                    ? 'cursor-not-allowed rounded-full bg-[#f1f1f1] p-2'
                    : 'rounded-full bg-[#f1f1f1] p-2'
                }
                onClick={() => handleScroll(-scrollAmount)}
              >
                <ArrowLeftIcon
                  height={20}
                  width={20}
                  className={
                    scrollPosition === 0 ? 'text-gray-400' : 'text-gray-700'
                  }
                />
              </button>
              <button
                disabled={
                  scrollPosition >=
                  (containerRef.current?.scrollWidth || 0) -
                    (containerRef.current?.clientWidth || 0)
                }
                className={
                  scrollPosition >=
                  (containerRef.current?.scrollWidth || 0) -
                    (containerRef.current?.clientWidth || 0)
                    ? 'cursor-not-allowed rounded-full bg-[#f1f1f1] p-2'
                    : 'rounded-full bg-[#f1f1f1] p-2'
                }
                onClick={() => handleScroll(scrollAmount)}
              >
                <ArrowRightIcon
                  height={20}
                  width={20}
                  className={
                    scrollPosition >=
                    (containerRef.current?.scrollWidth || 0) -
                      (containerRef.current?.clientWidth || 0)
                      ? 'text-gray-400'
                      : 'text-gray-700'
                  }
                />
              </button>
            </div>
            {products?.length >= 1 ? (
              <>
                {products?.slice(0, 4)?.map((product: any, index: number) => (
                  <ProductItem
                    remove_add_to_cart_botton={true}
                    key={index}
                    picture={product.pictures[0]}
                    price={product.price}
                    discount_price={product.discount_price}
                    name={product.title}
                    description={product.description}
                    category={product.category}
                    rating={product.averageRating}
                    id={product._id}
                    countInStock={product.countInStock}
                  />
                ))}
              </>
            ) : (
              <div
                onClick={() => history.push('/dashboard/inventory')}
                className="col-span-2 flex md:col-span-3 lg:col-span-5"
              >
                <p className="my-4 w-full flex-1 cursor-pointer rounded p-1 text-center text-sm capitalize text-gray-700 hover:bg-gray-50 md:text-lg">
                  No products to show. click here to become a seller?
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default RelatedProducts
