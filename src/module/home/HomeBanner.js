import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import React from "react";
import styled from "styled-components";

const HomeBannerStyles = styled.div`
  min-height: 520px;
  margin-bottom: 60px;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  div {
    padding: 20px 0;
  }
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-content {
      max-width: 600px;
      color: white;
    }
    &-heading {
      font-size: 36px;
      margin-bottom: 20px;
      font-weight: bold;
    }
    &-desc {
      line-height: 1.75;
      margin-bottom: 40px;
    }
  }
`;

const HomeBanner = () => {
  const { userInfo } = useAuth();
  return (
    <HomeBannerStyles>
      <div className="dark:bg-darkMain">
        <div className="container dark:bg-gradient-to-r from-gray-800 to-darkMain dark:rounded-2xl dark:px-5">
          <div className="banner">
            <div className="banner-content dark:text-center">
              <h1 className="banner-heading">Monkey Blogging</h1>
              <p className="banner-desc">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
                libero, modi sit voluptatem harum ullam ipsum sint, dicta non,
                ut quisquam et quod delectus rem nemo fugit voluptates impedit
                est.
              </p>
              {!userInfo && (
                <Button to="/sign-in" kind="secondary" className="dark:mx-auto">
                  Get Started
                </Button>
              )}
            </div>
            <div className="banner-image">
              <img srcSet="/img-banner.png 2x" alt="banner" />
            </div>
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
