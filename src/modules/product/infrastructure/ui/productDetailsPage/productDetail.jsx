import {ProductImage} from "./ProductImage.jsx";
import {ProductDescription} from "./ProductDescription.jsx";
import {ProductActions} from "./productActions.jsx";


export const ProductDetail = ({productDetail}) => {
    if (!productDetail) return (
        <div className="p-4">Loading...</div>
    )
    return (
        <div className="p-4">
            <div className="border rounded-lg p-4 shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProductImage
                        imgUrl={productDetail.imgUrl}
                        brand={productDetail.brand}
                        model={productDetail.model}
                    />
                    <div className="flex flex-col gap-6">
                        <ProductDescription product={productDetail}/>
                        <ProductActions product={productDetail}/>
                    </div>
                </div>
            </div>
        </div>
    );
}