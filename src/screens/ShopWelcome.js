import { useLocation } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import ShopBottomBox from "../components/shop/ShopBottomBox";
import ShopFormBox from "../components/shop/ShopFormBox";
import ShopHeaderContainer from "../components/shop/ShopHeaderContainer";
import ShopLayout from "../components/shop/ShopLayout";
import routes from "./routes";


function ShopWelcome() {
    const location = useLocation();
    return (
        <ShopLayout>
            <PageTitle title="Welcome" />
            <ShopFormBox>
                <ShopHeaderContainer size="3x" subtitle={location?.state?.message || "Welcome!"} />
            </ShopFormBox>
            <ShopBottomBox callToAction="Contine to Nomad Coffee?" link={routes.home} linkText="Contine to" />
        </ShopLayout>
    );
}
export default ShopWelcome;