const formCadastro = document.getElementById('formCadastro');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const telefone = document.getElementById('telefone');

formCadastro.addEventListener('submit', async function (event) {
    event.preventDefault();

    const nomeValue = nome.value.trim();
    const emailValue = email.value.trim();
    const senhaValue = senha.value.trim();
    const telefoneValue = telefone.value.trim();

    if (nomeValue === '' || emailValue === '' || senhaValue === '' || telefoneValue === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const cadastroData = {
        nome: nomeValue,
        email: emailValue,
        senha: senhaValue,
        telefone: telefoneValue
    };

    await api.cadastroPost(cadastroData);
});