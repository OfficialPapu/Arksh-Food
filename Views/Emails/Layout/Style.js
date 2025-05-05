import React from "react";

const Style = () => {
  return `   <style>
        .ContentSecion {
            padding: 30px 25px;
            background-color: #ffffff;
        }

        @media (max-width: 768px) {
            .ContentSecion {
                padding: 30px 10px;
            }
        }

         @media screen and (max-width: 600px) {
                table[class="container"] {
                    width: 100% !important;
                    max-width: 100% !important;
                }

                td[class="content-padding"] {
                    padding: 20px 15px !important;
                }

                td[class="header"] {
                    padding: 20px 15px !important;
                }

                div[class="logo-container"] {
                    width: 90px !important;
                    height: 90px !important;
                }

                h1 {
                    font-size: 22px !important;
                }

                h2 {
                    font-size: 16px !important;
                }

                p {
                    font-size: 14px !important;
                }

                td[width="50%"] {
                    display: block !important;
                    width: 100% !important;
                }

                td[width="50%"][align="right"] {
                    text-align: left !important;
                    padding-top: 8px !important;
                }

                td[width="70%"],
                td[width="30%"] {
                    display: block !important;
                    width: 100% !important;
                    text-align: center !important;
                }

                td[width="30%"][align="right"] {
                    text-align: center !important;
                    padding-top: 10px !important;
                }

                a[class="button"] {
                    display: block !important;
                    width: 100% !important;
                    padding: 12px 0 !important;
                }

                div[class="social-links"] a {
                    display: block !important;
                    margin: 10px 0 !important;
                }

                div[class="footer-links"] a {
                    display: block !important;
                    margin: 10px 0 !important;
                }
            }
    </style>`;
};

export default Style;
