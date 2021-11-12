const ctx = document.getElementById("graph").getContext("2d")

const labels = ['200', '300']

const data = {
    labels,
    datasets: [{
        data: [200, 100],
        label: "Data"
    }]
}

const config = {
    type: "bar",
    data: data,
    options: {
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true
            }
        }
    }

}

const graph = new Chart(ctx, config)

const editorElem = document.getElementById('code');
const flask = new CodeFlask(editorElem, { language: 'javascript' });
