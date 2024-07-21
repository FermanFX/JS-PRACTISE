const starsfirst = document.querySelectorAll(".stars1 i");
const starssecond = document.querySelectorAll(".stars2 i");
const starsthird = document.querySelectorAll(".stars3 i");
starsfirst.forEach((star, index1) => {

    star.addEventListener("click", () => {

        starsfirst.forEach((star, index2) => {

            index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
        });
    });
});
starssecond.forEach((star, index1) => {

    star.addEventListener("click", () => {

        starssecond.forEach((star, index2) => {

            index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
        });
    });
});
starsthird.forEach((star, index1) => {

    star.addEventListener("click", () => {

        starsthird.forEach((star, index2) => {

            index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
        });
    });
});