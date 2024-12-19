import { useAuth } from "../../../../Contexts/AuthContext";
import AdminMenu from "../../../Components/Admin/Sidebar/Sidebar";
import LoginForm from "../../Login/Login";
import Layout from "../../Layout/Layout";
import ServiceList from "../../../Components/Admin/ServiceList/ServiceList";

const Services = () => {
  const { isLogged, isAdmin } = useAuth();
  if (isLogged) {
    if (isAdmin) {
      return (
        <Layout>
          <div>
            <div className="container-fluid admin-pages">
              <div className="row">
                <div className="col-md-3 admin-left-side">
                  <AdminMenu />
                </div>
                <div className="col-md-9 admin-right-side">
                  <ServiceList />
                </div>
              </div>
            </div>
          </div>
        </Layout>
      );
    }
  } else {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
};

export default Services;
