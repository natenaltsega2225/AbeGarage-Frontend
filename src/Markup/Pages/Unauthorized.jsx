import React from "react";
import Layout from "./Layout/Layout";
 function Unauthorized() {
    return (
        <Layout>
            <h1>You don't have the authorization to access the page you requested</h1>
        </Layout>
    );
}
export default Unauthorized; 