const formAnunciarApartamento = document.getElementById('formAnunciarImovel');


const radioTipoImovel = document.getElementsByName('tipo_imovel');
const checkVenda = document.getElementById('checkVenda');
const checkAluguel = document.getElementById('checkAluguel');


const divPrecoVenda = document.getElementById('precoVenda').parentElement;
const divPrecoAluguel = document.getElementById('precoAluguel').parentElement;
const divCondominio = document.getElementById('condominio').parentElement;
const divIptu = document.getElementById('iptu').parentElement;

let categoriaImovel = null;

radioTipoImovel.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.value === 'casa') {
            categoriaImovel = 'casa';
        }
        if (radio.value === 'apartamento') {
            categoriaImovel = 'apartamento';
        }
        if (radio.value === 'terreno') {
            categoriaImovel = 'terreno';
        }


    });
});

checkVenda.addEventListener('change', () => {




    if (checkVenda.checked) {
        divPrecoVenda.classList.remove('hidden');
        if (formAnunciarImovel.classList.contains('hidden')) {
            formAnunciarImovel.classList.remove('hidden');
        }
    } else {
        divPrecoVenda.classList.add('hidden');
        if (!formAnunciarImovel.classList.contains('hidden') && !checkAluguel.checked) {
            formAnunciarImovel.classList.add('hidden');
        }
    }
});

checkAluguel.addEventListener('change', () => {
    if (checkAluguel.checked) {
        divPrecoAluguel.classList.remove('hidden');
        divCondominio.classList.remove('hidden');
        divIptu.classList.remove('hidden');

        if (formAnunciarImovel.classList.contains('hidden')) {
            formAnunciarImovel.classList.remove('hidden');
        }
    } else {
        divPrecoAluguel.classList.add('hidden');
        divCondominio.classList.add('hidden');
        divIptu.classList.add('hidden');

        if (!formAnunciarImovel.classList.contains('hidden') && !checkVenda.checked) {
            formAnunciarImovel.classList.add('hidden');
        }
    }
});




formAnunciarImovel.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(formAnunciarImovel);
    const data = Object.fromEntries(formData);

    console.log(data);
});
