import {useFindById} from "../useFindById.js";
import {useParams} from "react-router-dom";
import {ProductImage} from "./ProductImage.jsx";
import {ProductDescription} from "./ProductDescription.jsx";


export const ProductDetail = ({findByIdUseCase}) => {
    let {id} = useParams();
    const {productDetail} = useFindById(findByIdUseCase, id);
    if (!productDetail) return (
        <div className="p-4">Loading...</div>
    )
    console.log(productDetail);
    return (
        <div className="p-4">
            <div className="border rounded-lg p-4 shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProductImage
                        imgUrl={productDetail.imgUrl}
                        brand={productDetail.brand}
                        model={productDetail.model}
                    />
                    <ProductDescription product={productDetail}/>
                </div>
            </div>
        </div>
    );
}