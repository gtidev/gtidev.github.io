async function getData() {
    const spreadsheetId = '1pxCzouf29kJk7zD6uYeA2MtWX8Ehia9da2APKwwj52M'
    const apiKey = 'AIzaSyD67HOFrLM1Dsv_NM_NRBc865nVT_0Gi0s';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/?key=${apiKey}&includeGridData=true`;
    const result = await fetch(url)
    const { sheets } = await result.json();
    const activeSheet = sheets[2];
    const data = activeSheet.data[0].rowData
        .filter((_, index) => index !== 0) // Mulai dari index 1 (menghindari nama kolom)
        .map(row => {
            const { values } = row;
            return {
                image: values[0].formattedValue,
                title: values[1].formattedValue,
                company: values[2].formattedValue,
                categories: values[3].formattedValue,
                link1: values[4].formattedValue,
                link2: values[5].formattedValue,
            }
        })
    return data;
}

function dataItemTemplate(item) {
    return (
        `<div class="col-sm-4 landing-about-feature wow fadeInUp mb-5">
            <img src="${item.image}" alt="document" class="about-feature-icon">
            <h5 class="about-feature-title">${item.title}</h5>
            <p class="about-feature-description">${item.company}</p>
            <p class="about-feature-description">${item.categories}</p>
            <a class="btn btn-success" href="${item.link1}" target=_blank role="button">Apply Now</a>
            <a class="btn btn-primary" href="${item.link2}" target=_blank role="button">Visit</a>
        </div>`
    )
}

async function renderData() {
    const wrapperDOM = document.getElementById('wrapper3');
    try {
        const data = await getData();
        wrapperDOM.innerHTML = data.map(item => dataItemTemplate(item)).join('');
    } catch (error) {
        wrapperDOM.innerHTML = error
    }
}

renderData();