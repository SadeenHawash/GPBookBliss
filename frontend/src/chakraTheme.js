import { background, extendTheme, styled } from "@chakra-ui/react";

const chakraTheme = extendTheme({
    fonts: {
        body: "Caveat, cursive",
        heading: "Caveat, cursive",
    },
    styles: {
        global: {
            body: {
                bgImage: "url('./assets/g1.jpg')",
                bgSize: "cover",
                bgRepeat: "no-repeat",
                bgPosition: "center center",
                fontFamily: "Caveat, cursive",
                bgColor: "#faf8f7"
            },
        },
    },
});

export default chakraTheme;
