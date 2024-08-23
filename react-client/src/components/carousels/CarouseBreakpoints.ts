export const regularResponsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1720 },
        items: 7,
        slidesToSlide: 7,
        partialVisibilityGutter: 15
    },
    largeDesktop: {
        breakpoint: { max: 1720, min: 1280 },
        items: 6,
        slidesToSlide: 6,
        partialVisibilityGutter: 15
    },
    smallDesktop: {
        breakpoint: { max: 1280, min: 920 },
        items: 5,
        slidesToSlide: 5,
        partialVisibilityGutter: 15,
        
    },
    largeTablet: {
        breakpoint: { max: 920, min: 680 },
        items: 4,
        slidesToSlide: 4,
        partialVisibilityGutter: 15
    },
    smallTablet: {
        breakpoint: { max: 680, min: 480 },
        items: 3,
        slidesToSlide: 3,
        partialVisibilityGutter: 15
    },
    mobile: {
        breakpoint: { max: 480, min: 0 },
        items: 2,
        slidesToSlide: 2,
        partialVisibilityGutter: 15
    }
}

export const featuredResponsive = {
    all: {
        breakpoint: { max: 4000, min: 0},
        items: 1,
        slidesToSlide: 1,
        partialVisibilityGutter: 0
    }
}