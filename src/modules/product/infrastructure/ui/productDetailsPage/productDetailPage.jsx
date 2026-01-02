import {PageContainer} from "../shared/pageContainer.jsx";
import {useFindById} from "../useFindById.js";
import {ProductDetail} from "./productDetail.jsx";
import {useParams} from "react-router-dom";

export const ProductDetailPage = () => {
    let {id} = useParams();
    const {productDetail} = useFindById(id);
    return (
        <PageContainer>
            <ProductDetail productDetail={productDetail}/>
        </PageContainer>
    );
}