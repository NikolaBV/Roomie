import { useNavigate } from "react-router-dom";
import routes from "../utils/PageRoutes";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <footer className="footer-container">
        <div className="footer-items">
          <h3 className="force-link">About Us</h3>
          <h3
            className="force-link"
            onClick={() => navigate(routes.posts.posts)}
          >
            Posts
          </h3>
        </div>
      </footer>
    </>
  );
}
