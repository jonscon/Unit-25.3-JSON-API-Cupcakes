const BASE_URL = "http://127.0.0.1:5000/api";

/** Given information about a cupcake, add to page */
function generateCupcakeHTML(cupcake) {
    return `
    <div data-cupcake-id=${cupcake.id}>
        <img src="${cupcake.image}" width="200">
        <li>
            ${cupcake.flavor} / ${cupcake.size} / ${cupcake.flavor}
        </li>
    </div>`;
}

/** Add initial cupcakes onto page */
async function showInitialCupcakes() {
    const response = await axios.get(`${BASE_URL}/cupcakes`)
    for (let cupcakeData of response.data.cupcakes) {
        let newCupcake = $(generateCupcakeHTML(cupcakeData));
        console.log(cupcakeData)
        $("#cupcakes-list").append(newCupcake);
    }
}

/** Handle form for adding cupcake */
$("#new-cupcake-form").on("submit", async function(evt) {
    evt.preventDefault();

    let flavor = $("#form-flavor").val();
    let size = $("#form-size").val();
    let rating = $("#form-rating").val();
    let image = $("#form-image").val();

    const newCupcakeResp = await axios.post(`${BASE_URL}/cupcakes`, {
        flavor,
        size,
        rating,
        image
    });

    let newCupcake = generateCupcakeHTML(newCupcakeResp.data.cupcake);
    $("#cupcakes-list").append(newCupcake);
    $("#new-cupcake-form").trigger("reset");

})

$(showInitialCupcakes);