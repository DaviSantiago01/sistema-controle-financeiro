# Sistema de Controle Financeiro Pessoal 💰

Um sistema web desenvolvido em Django para controle de finanças pessoais, ideal para iniciantes em Django que querem aprender na prática.

## 📋 Sobre o Projeto

Este é um projeto educacional que implementa um sistema completo de controle financeiro pessoal, incluindo:

- ✅ Cadastro de receitas e despesas
- ✅ Categorização de transações
- ✅ Relatórios financeiros
- ✅ Dashboard com gráficos
- ✅ Sistema de autenticação de usuários
- ✅ Interface responsiva e moderna

## 🎯 Objetivo Educacional

Este projeto foi criado especificamente para iniciantes em Django, fornecendo:

- Estrutura de projeto bem organizada
- Código comentado e explicado
- Tutorial passo a passo completo
- Boas práticas de desenvolvimento
- Exemplos práticos de conceitos Django

## 🚀 Tecnologias Utilizadas

- **Backend:** Django 5.0+
- **Frontend:** HTML5, CSS3, JavaScript, Bootstrap 5
- **Banco de Dados:** SQLite (desenvolvimento) / PostgreSQL (produção)
- **Gráficos:** Chart.js
- **Autenticação:** Django Auth System

## 📁 Estrutura do Projeto

```
sistema-controle-financeiro/
├── financeiro_project/          # Projeto Django principal
│   ├── settings.py             # Configurações do projeto
│   ├── urls.py                 # URLs principais
│   └── wsgi.py                 # Configuração WSGI
├── accounts/                   # App de autenticação
├── transactions/               # App de transações financeiras
├── dashboard/                  # App do dashboard
├── static/                     # Arquivos estáticos (CSS, JS, imagens)
├── templates/                  # Templates HTML
├── media/                      # Arquivos de mídia
├── requirements.txt            # Dependências do projeto
├── manage.py                   # Script de gerenciamento Django
└── TUTORIAL.md                 # Tutorial completo passo a passo
```

## 📚 Como Usar Este Projeto

### Para Iniciantes:
1. Leia o arquivo `TUTORIAL.md` - ele contém um guia completo passo a passo
2. Siga as instruções de instalação
3. Execute cada comando explicado no tutorial
4. Analise o código fornecido em cada etapa

### Pré-requisitos:
- Python 3.8+
- pip (gerenciador de pacotes Python)
- Git
- Editor de código (VS Code recomendado)

## 🛠️ Instalação Rápida

```bash
# 1. Clone o repositório
git clone https://github.com/DaviSantiago01/sistema-controle-financeiro.git
cd sistema-controle-financeiro

# 2. Crie um ambiente virtual
python -m venv venv

# 3. Ative o ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# 4. Instale as dependências
pip install -r requirements.txt

# 5. Execute as migrações
python manage.py migrate

# 6. Crie um superusuário
python manage.py createsuperuser

# 7. Execute o servidor
python manage.py runserver
```

## 📖 Tutorial Completo

Para um aprendizado completo e detalhado, consulte o arquivo **[TUTORIAL.md](TUTORIAL.md)** que contém:

- Explicação de cada conceito Django utilizado
- Código comentado linha por linha
- Exercícios práticos
- Dicas e boas práticas
- Solução de problemas comuns

## 🎨 Funcionalidades Implementadas

### 1. Sistema de Autenticação
- Registro de usuários
- Login/Logout
- Perfil do usuário

### 2. Gestão de Transações
- Cadastro de receitas
- Cadastro de despesas
- Categorização
- Edição e exclusão

### 3. Dashboard
- Resumo financeiro
- Gráficos interativos
- Filtros por período
- Relatórios

### 4. Interface
- Design responsivo
- Navegação intuitiva
- Feedback visual
- Validação de formulários

## 🤝 Contribuindo

Este é um projeto educacional, mas contribuições são bem-vindas:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

Davi Santiago - [@DaviSantiago01](https://github.com/DaviSantiago01)

Link do Projeto: [https://github.com/DaviSantiago01/sistema-controle-financeiro](https://github.com/DaviSantiago01/sistema-controle-financeiro)

---

⭐ Se este projeto te ajudou a aprender Django, não esqueça de dar uma estrela!