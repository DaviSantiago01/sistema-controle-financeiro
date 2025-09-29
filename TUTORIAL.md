# 📚 Tutorial Completo: Sistema de Controle Financeiro com Django

Este tutorial foi criado especialmente para **iniciantes em Django** que querem aprender criando um projeto real e útil.

## 🎯 O que você vai aprender

- Estrutura de um projeto Django
- Criação e configuração de apps
- Models, Views e Templates
- Sistema de autenticação
- Formulários Django
- Relacionamentos entre modelos
- Interface administrativa
- Arquivos estáticos e templates
- Boas práticas de desenvolvimento

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:

- **Python 3.8+** instalado
- **pip** (gerenciador de pacotes Python)
- **Git** instalado
- Editor de código (recomendo **VS Code**)
- Conhecimento básico de Python
- Conhecimento básico de HTML/CSS

---

## 🚀 PASSO 1: Configuração do Ambiente

### 1.1 Clone o repositório
```bash
git clone https://github.com/DaviSantiago01/sistema-controle-financeiro.git
cd sistema-controle-financeiro
```

### 1.2 Crie um ambiente virtual
```bash
# Windows
python -m venv venv

# Linux/Mac
python3 -m venv venv
```

**Por que usar ambiente virtual?**
- Isola as dependências do projeto
- Evita conflitos entre diferentes projetos
- Facilita o deployment

### 1.3 Ative o ambiente virtual
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

Você deve ver `(venv)` no início do seu prompt de comando.

### 1.4 Instale as dependências
```bash
pip install -r requirements.txt
```

---

## 🏗️ PASSO 2: Criando o Projeto Django

### 2.1 Crie o projeto principal
```bash
django-admin startproject financeiro_project .
```

**Estrutura criada:**
```
financeiro_project/
├── __init__.py          # Torna a pasta um pacote Python
├── settings.py          # Configurações do projeto
├── urls.py             # URLs principais do projeto
├── wsgi.py             # Interface para servidores web
└── asgi.py             # Interface para aplicações assíncronas
```

### 2.2 Entenda o arquivo `settings.py`

Este é o coração do seu projeto Django. Principais configurações:

```python
# financeiro_project/settings.py

# Configurações básicas
DEBUG = True  # NUNCA deixe True em produção
ALLOWED_HOSTS = []  # Hosts permitidos para acessar a aplicação

# Apps instalados
INSTALLED_APPS = [
    'django.contrib.admin',      # Interface administrativa
    'django.contrib.auth',       # Sistema de autenticação
    'django.contrib.contenttypes',
    'django.contrib.sessions',   # Gerenciamento de sessões
    'django.contrib.messages',   # Sistema de mensagens
    'django.contrib.staticfiles', # Arquivos estáticos
    # Seus apps serão adicionados aqui
]

# Configuração do banco de dados
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Configurações de idioma e fuso horário
LANGUAGE_CODE = 'pt-br'
TIME_ZONE = 'America/Sao_Paulo'
```

---

## 📱 PASSO 3: Criando os Apps

Django usa o conceito de "apps" - módulos que implementam funcionalidades específicas.

### 3.1 Crie o app de autenticação
```bash
python manage.py startapp accounts
```

### 3.2 Crie o app de transações
```bash
python manage.py startapp transactions
```

### 3.3 Crie o app do dashboard
```bash
python manage.py startapp dashboard
```

**Estrutura de cada app:**
```
accounts/
├── __init__.py
├── admin.py        # Configurações do admin
├── apps.py         # Configurações do app
├── models.py       # Modelos de dados
├── tests.py        # Testes
├── views.py        # Lógica de negócio
└── migrations/     # Migrações do banco
```

### 3.4 Registre os apps no `settings.py`

**CÓDIGO PARA ADICIONAR:**
```python
# financeiro_project/settings.py

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Seus apps
    'accounts',
    'transactions',
    'dashboard',
]
```

---

## 🗄️ PASSO 4: Criando os Modelos (Models)

Os modelos definem a estrutura dos dados no banco.

### 4.1 Modelo de Categoria (transactions/models.py)

**CÓDIGO PARA ADICIONAR:**
```python
# transactions/models.py
from django.db import models
from django.contrib.auth.models import User

class Categoria(models.Model):
    TIPOS_CATEGORIA = [
        ('receita', 'Receita'),
        ('despesa', 'Despesa'),
    ]
    
    nome = models.CharField(max_length=100)
    tipo = models.CharField(max_length=10, choices=TIPOS_CATEGORIA)
    cor = models.CharField(max_length=7, default='#007bff')  # Cor em hexadecimal
    icone = models.CharField(max_length=50, default='fas fa-tag')
    ativo = models.BooleanField(default=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'
        ordering = ['nome']
    
    def __str__(self):
        return f"{self.nome} ({self.get_tipo_display()})"
```

**Explicação do código:**
- `CharField`: Campo de texto com tamanho limitado
- `choices`: Define opções pré-definidas
- `BooleanField`: Campo verdadeiro/falso
- `DateTimeField`: Campo de data e hora
- `auto_now_add=True`: Define automaticamente na criação
- `Meta`: Configurações adicionais do modelo
- `__str__`: Como o objeto será exibido

### 4.2 Modelo de Transação (transactions/models.py)

**CÓDIGO PARA ADICIONAR (no mesmo arquivo):**
```python
class Transacao(models.Model):
    TIPOS_TRANSACAO = [
        ('receita', 'Receita'),
        ('despesa', 'Despesa'),
    ]
    
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    descricao = models.CharField(max_length=200)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    tipo = models.CharField(max_length=10, choices=TIPOS_TRANSACAO)
    data = models.DateField()
    observacoes = models.TextField(blank=True, null=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Transação'
        verbose_name_plural = 'Transações'
        ordering = ['-data', '-criado_em']
    
    def __str__(self):
        return f"{self.descricao} - R$ {self.valor}"
    
    @property
    def valor_formatado(self):
        return f"R$ {self.valor:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.')
```

**Explicação dos novos conceitos:**
- `ForeignKey`: Relacionamento com outro modelo
- `on_delete=models.CASCADE`: Se o usuário for deletado, deleta as transações
- `DecimalField`: Campo para valores monetários (mais preciso que float)
- `DateField`: Campo apenas de data
- `TextField`: Campo de texto longo
- `blank=True, null=True`: Campo opcional
- `auto_now=True`: Atualiza automaticamente na modificação
- `@property`: Cria um atributo calculado

### 4.3 Modelo de Perfil do Usuário (accounts/models.py)

**CÓDIGO PARA ADICIONAR:**
```python
# accounts/models.py
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class PerfilUsuario(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    telefone = models.CharField(max_length=15, blank=True)
    data_nascimento = models.DateField(blank=True, null=True)
    foto = models.ImageField(upload_to='perfis/', blank=True, null=True)
    bio = models.TextField(max_length=500, blank=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Perfil do Usuário'
        verbose_name_plural = 'Perfis dos Usuários'
    
    def __str__(self):
        return f"Perfil de {self.usuario.username}"

# Signal para criar perfil automaticamente
@receiver(post_save, sender=User)
def criar_perfil_usuario(sender, instance, created, **kwargs):
    if created:
        PerfilUsuario.objects.create(usuario=instance)

@receiver(post_save, sender=User)
def salvar_perfil_usuario(sender, instance, **kwargs):
    instance.perfilusuario.save()
```

**Explicação dos novos conceitos:**
- `OneToOneField`: Relacionamento um-para-um
- `ImageField`: Campo para upload de imagens
- `upload_to`: Pasta onde as imagens serão salvas
- `@receiver`: Decorator para signals (eventos)
- `post_save`: Signal disparado após salvar um objeto

---

## 🔄 PASSO 5: Migrações do Banco de Dados

### 5.1 Crie as migrações
```bash
python manage.py makemigrations
```

Este comando analisa seus modelos e cria arquivos de migração.

### 5.2 Aplique as migrações
```bash
python manage.py migrate
```

Este comando executa as migrações no banco de dados.

### 5.3 Crie um superusuário
```bash
python manage.py createsuperuser
```

Siga as instruções para criar um usuário administrador.

---

## 🎨 PASSO 6: Configurando Templates e Arquivos Estáticos

### 6.1 Crie a estrutura de pastas
```
projeto/
├── templates/
│   ├── base.html
│   ├── accounts/
│   ├── transactions/
│   └── dashboard/
└── static/
    ├── css/
    ├── js/
    └── img/
```

### 6.2 Configure no settings.py

**CÓDIGO PARA ADICIONAR:**
```python
# financeiro_project/settings.py
import os

# Configuração de templates
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],  # Adicione esta linha
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Configuração de arquivos estáticos
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Configuração de arquivos de mídia
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
```

### 6.3 Template base (templates/base.html)

**CÓDIGO PARA CRIAR:**
```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}Sistema Financeiro{% endblock %}</title>
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <!-- CSS personalizado -->
    {% load static %}
    <link rel="stylesheet" href="{% static 'css/style.css' %}">
    
    {% block extra_css %}{% endblock %}
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="{% url 'dashboard:home' %}">
                <i class="fas fa-wallet me-2"></i>
                Controle Financeiro
            </a>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    {% if user.is_authenticated %}
                        <li class="nav-item">
                            <a class="nav-link" href="{% url 'dashboard:home' %}">
                                <i class="fas fa-home me-1"></i>Dashboard
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{% url 'transactions:lista' %}">
                                <i class="fas fa-list me-1"></i>Transações
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{% url 'transactions:nova' %}">
                                <i class="fas fa-plus me-1"></i>Nova Transação
                            </a>
                        </li>
                    {% endif %}
                </ul>
                
                <ul class="navbar-nav">
                    {% if user.is_authenticated %}
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                                <i class="fas fa-user me-1"></i>{{ user.first_name|default:user.username }}
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="{% url 'accounts:perfil' %}">
                                    <i class="fas fa-user-edit me-2"></i>Meu Perfil
                                </a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="{% url 'accounts:logout' %}">
                                    <i class="fas fa-sign-out-alt me-2"></i>Sair
                                </a></li>
                            </ul>
                        </li>
                    {% else %}
                        <li class="nav-item">
                            <a class="nav-link" href="{% url 'accounts:login' %}">
                                <i class="fas fa-sign-in-alt me-1"></i>Entrar
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{% url 'accounts:registro' %}">
                                <i class="fas fa-user-plus me-1"></i>Registrar
                            </a>
                        </li>
                    {% endif %}
                </ul>
            </div>
        </div>
    </nav>

    <!-- Mensagens -->
    {% if messages %}
        <div class="container mt-3">
            {% for message in messages %}
                <div class="alert alert-{{ message.tags }} alert-dismissible fade show" role="alert">
                    {{ message }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            {% endfor %}
        </div>
    {% endif %}

    <!-- Conteúdo principal -->
    <main class="container my-4">
        {% block content %}{% endblock %}
    </main>

    <!-- Footer -->
    <footer class="bg-light text-center text-muted py-3 mt-5">
        <div class="container">
            <p>&copy; 2024 Sistema de Controle Financeiro. Desenvolvido com Django.</p>
        </div>
    </footer>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
    {% block extra_js %}{% endblock %}
</body>
</html>
```

---

## 🔐 PASSO 7: Sistema de Autenticação (accounts/views.py)

**CÓDIGO PARA CRIAR:**
```python
# accounts/views.py
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.models import User
from .models import PerfilUsuario

def registro(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Conta criada para {username}!')
            return redirect('accounts:login')
    else:
        form = UserCreationForm()
    return render(request, 'accounts/registro.html', {'form': form})

@login_required
def perfil(request):
    perfil, created = PerfilUsuario.objects.get_or_create(usuario=request.user)
    return render(request, 'accounts/perfil.html', {'perfil': perfil})
```

---

## 💰 PASSO 8: Views de Transações (transactions/views.py)

**CÓDIGO PARA CRIAR:**
```python
# transactions/views.py
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Sum, Q
from django.utils import timezone
from .models import Transacao, Categoria
from .forms import TransacaoForm

@login_required
def lista_transacoes(request):
    transacoes = Transacao.objects.filter(usuario=request.user)
    
    # Filtros
    tipo = request.GET.get('tipo')
    categoria_id = request.GET.get('categoria')
    
    if tipo:
        transacoes = transacoes.filter(tipo=tipo)
    if categoria_id:
        transacoes = transacoes.filter(categoria_id=categoria_id)
    
    categorias = Categoria.objects.filter(ativo=True)
    
    context = {
        'transacoes': transacoes,
        'categorias': categorias,
        'tipo_selecionado': tipo,
        'categoria_selecionada': categoria_id,
    }
    return render(request, 'transactions/lista.html', context)

@login_required
def nova_transacao(request):
    if request.method == 'POST':
        form = TransacaoForm(request.POST)
        if form.is_valid():
            transacao = form.save(commit=False)
            transacao.usuario = request.user
            transacao.save()
            messages.success(request, 'Transação criada com sucesso!')
            return redirect('transactions:lista')
    else:
        form = TransacaoForm()
    
    return render(request, 'transactions/nova.html', {'form': form})

@login_required
def editar_transacao(request, pk):
    transacao = get_object_or_404(Transacao, pk=pk, usuario=request.user)
    
    if request.method == 'POST':
        form = TransacaoForm(request.POST, instance=transacao)
        if form.is_valid():
            form.save()
            messages.success(request, 'Transação atualizada com sucesso!')
            return redirect('transactions:lista')
    else:
        form = TransacaoForm(instance=transacao)
    
    return render(request, 'transactions/editar.html', {
        'form': form, 
        'transacao': transacao
    })

@login_required
def deletar_transacao(request, pk):
    transacao = get_object_or_404(Transacao, pk=pk, usuario=request.user)
    
    if request.method == 'POST':
        transacao.delete()
        messages.success(request, 'Transação deletada com sucesso!')
        return redirect('transactions:lista')
    
    return render(request, 'transactions/deletar.html', {'transacao': transacao})
```

---

## 📊 PASSO 9: Dashboard (dashboard/views.py)

**CÓDIGO PARA CRIAR:**
```python
# dashboard/views.py
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.db.models import Sum, Count
from django.utils import timezone
from datetime import datetime, timedelta
from transactions.models import Transacao, Categoria
import json

@login_required
def home(request):
    # Data atual
    hoje = timezone.now().date()
    inicio_mes = hoje.replace(day=1)
    
    # Transações do usuário
    transacoes_usuario = Transacao.objects.filter(usuario=request.user)
    
    # Resumo financeiro do mês atual
    receitas_mes = transacoes_usuario.filter(
        tipo='receita',
        data__gte=inicio_mes,
        data__lte=hoje
    ).aggregate(total=Sum('valor'))['total'] or 0
    
    despesas_mes = transacoes_usuario.filter(
        tipo='despesa',
        data__gte=inicio_mes,
        data__lte=hoje
    ).aggregate(total=Sum('valor'))['total'] or 0
    
    saldo_mes = receitas_mes - despesas_mes
    
    # Últimas transações
    ultimas_transacoes = transacoes_usuario.order_by('-data', '-criado_em')[:5]
    
    # Dados para gráficos
    # Receitas vs Despesas por categoria
    categorias_receita = transacoes_usuario.filter(
        tipo='receita',
        data__gte=inicio_mes
    ).values('categoria__nome').annotate(
        total=Sum('valor')
    ).order_by('-total')
    
    categorias_despesa = transacoes_usuario.filter(
        tipo='despesa',
        data__gte=inicio_mes
    ).values('categoria__nome').annotate(
        total=Sum('valor')
    ).order_by('-total')
    
    # Evolução mensal (últimos 6 meses)
    evolucao_mensal = []
    for i in range(6):
        data_inicio = (hoje.replace(day=1) - timedelta(days=i*30)).replace(day=1)
        data_fim = (data_inicio.replace(month=data_inicio.month+1) - timedelta(days=1)) if data_inicio.month < 12 else data_inicio.replace(year=data_inicio.year+1, month=1) - timedelta(days=1)
        
        receitas = transacoes_usuario.filter(
            tipo='receita',
            data__gte=data_inicio,
            data__lte=data_fim
        ).aggregate(total=Sum('valor'))['total'] or 0
        
        despesas = transacoes_usuario.filter(
            tipo='despesa',
            data__gte=data_inicio,
            data__lte=data_fim
        ).aggregate(total=Sum('valor'))['total'] or 0
        
        evolucao_mensal.append({
            'mes': data_inicio.strftime('%b/%Y'),
            'receitas': float(receitas),
            'despesas': float(despesas),
            'saldo': float(receitas - despesas)
        })
    
    evolucao_mensal.reverse()
    
    context = {
        'receitas_mes': receitas_mes,
        'despesas_mes': despesas_mes,
        'saldo_mes': saldo_mes,
        'ultimas_transacoes': ultimas_transacoes,
        'categorias_receita': list(categorias_receita),
        'categorias_despesa': list(categorias_despesa),
        'evolucao_mensal': json.dumps(evolucao_mensal),
    }
    
    return render(request, 'dashboard/home.html', context)
```

---

## 📝 PASSO 10: Formulários (transactions/forms.py)

**CÓDIGO PARA CRIAR:**
```python
# transactions/forms.py
from django import forms
from .models import Transacao, Categoria

class TransacaoForm(forms.ModelForm):
    class Meta:
        model = Transacao
        fields = ['categoria', 'descricao', 'valor', 'tipo', 'data', 'observacoes']
        widgets = {
            'categoria': forms.Select(attrs={
                'class': 'form-select',
                'required': True
            }),
            'descricao': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Descrição da transação',
                'required': True
            }),
            'valor': forms.NumberInput(attrs={
                'class': 'form-control',
                'step': '0.01',
                'min': '0',
                'placeholder': '0,00',
                'required': True
            }),
            'tipo': forms.Select(attrs={
                'class': 'form-select',
                'required': True
            }),
            'data': forms.DateInput(attrs={
                'class': 'form-control',
                'type': 'date',
                'required': True
            }),
            'observacoes': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': 'Observações adicionais (opcional)'
            }),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['categoria'].queryset = Categoria.objects.filter(ativo=True)
        
        # Definir valor padrão para data
        if not self.instance.pk:
            from django.utils import timezone
            self.fields['data'].initial = timezone.now().date()
```

---

## 🔗 PASSO 11: URLs

### 11.1 URLs principais (financeiro_project/urls.py)

**CÓDIGO PARA SUBSTITUIR:**
```python
# financeiro_project/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('dashboard.urls')),
    path('accounts/', include('accounts.urls')),
    path('transactions/', include('transactions.urls')),
]

# Servir arquivos de mídia em desenvolvimento
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

### 11.2 URLs do dashboard (dashboard/urls.py)

**CÓDIGO PARA CRIAR:**
```python
# dashboard/urls.py
from django.urls import path
from . import views

app_name = 'dashboard'

urlpatterns = [
    path('', views.home, name='home'),
]
```

### 11.3 URLs das transações (transactions/urls.py)

**CÓDIGO PARA CRIAR:**
```python
# transactions/urls.py
from django.urls import path
from . import views

app_name = 'transactions'

urlpatterns = [
    path('', views.lista_transacoes, name='lista'),
    path('nova/', views.nova_transacao, name='nova'),
    path('<int:pk>/editar/', views.editar_transacao, name='editar'),
    path('<int:pk>/deletar/', views.deletar_transacao, name='deletar'),
]
```

### 11.4 URLs de autenticação (accounts/urls.py)

**CÓDIGO PARA CRIAR:**
```python
# accounts/urls.py
from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

app_name = 'accounts'

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(template_name='accounts/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('registro/', views.registro, name='registro'),
    path('perfil/', views.perfil, name='perfil'),
]
```

---

## 🎨 PASSO 12: CSS Personalizado (static/css/style.css)

**CÓDIGO PARA CRIAR:**
```css
/* static/css/style.css */

/* Variáveis CSS */
:root {
    --primary-color: #007bff;
    --success-color: #28a745;
    --danger-color: #dc3545;
    --warning-color: #ffc107;
    --info-color: #17a2b8;
    --light-color: #f8f9fa;
    --dark-color: #343a40;
}

/* Estilos gerais */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f8f9fa;
}

/* Cards personalizados */
.card {
    border: none;
    border-radius: 10px;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    transition: box-shadow 0.15s ease-in-out;
}

.card:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

/* Cards de resumo financeiro */
.card-receita {
    border-left: 4px solid var(--success-color);
}

.card-despesa {
    border-left: 4px solid var(--danger-color);
}

.card-saldo {
    border-left: 4px solid var(--info-color);
}

/* Valores monetários */
.valor-positivo {
    color: var(--success-color);
    font-weight: bold;
}

.valor-negativo {
    color: var(--danger-color);
    font-weight: bold;
}

.valor-neutro {
    color: var(--info-color);
    font-weight: bold;
}

/* Tabelas */
.table {
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
}

.table thead th {
    background-color: var(--primary-color);
    color: white;
    border: none;
    font-weight: 600;
}

/* Botões personalizados */
.btn {
    border-radius: 6px;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
}

.btn:hover {
    transform: translateY(-1px);
}

/* Badges de categoria */
.badge-receita {
    background-color: var(--success-color);
}

.badge-despesa {
    background-color: var(--danger-color);
}

/* Formulários */
.form-control, .form-select {
    border-radius: 6px;
    border: 1px solid #ced4da;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus, .form-select:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

/* Navbar personalizada */
.navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
}

/* Footer */
footer {
    margin-top: auto;
}

/* Responsividade */
@media (max-width: 768px) {
    .container {
        padding-left: 15px;
        padding-right: 15px;
    }
    
    .card {
        margin-bottom: 1rem;
    }
    
    .table-responsive {
        font-size: 0.875rem;
    }
}

/* Animações */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeIn 0.5s ease-in-out;
}

/* Gráficos */
.chart-container {
    position: relative;
    height: 400px;
    margin: 20px 0;
}

/* Alertas personalizados */
.alert {
    border: none;
    border-radius: 8px;
    font-weight: 500;
}

/* Loading spinner */
.spinner-border-sm {
    width: 1rem;
    height: 1rem;
}
```

---

## 🛠️ PASSO 13: Configuração do Admin

### 13.1 Admin das transações (transactions/admin.py)

**CÓDIGO PARA SUBSTITUIR:**
```python
# transactions/admin.py
from django.contrib import admin
from .models import Categoria, Transacao

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ['nome', 'tipo', 'cor', 'ativo', 'criado_em']
    list_filter = ['tipo', 'ativo']
    search_fields = ['nome']
    list_editable = ['ativo']
    ordering = ['nome']

@admin.register(Transacao)
class TransacaoAdmin(admin.ModelAdmin):
    list_display = ['descricao', 'usuario', 'categoria', 'valor', 'tipo', 'data']
    list_filter = ['tipo', 'categoria', 'data']
    search_fields = ['descricao', 'usuario__username']
    date_hierarchy = 'data'
    ordering = ['-data', '-criado_em']
    
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(usuario=request.user)
```

### 13.2 Admin dos perfis (accounts/admin.py)

**CÓDIGO PARA SUBSTITUIR:**
```python
# accounts/admin.py
from django.contrib import admin
from .models import PerfilUsuario

@admin.register(PerfilUsuario)
class PerfilUsuarioAdmin(admin.ModelAdmin):
    list_display = ['usuario', 'telefone', 'data_nascimento', 'criado_em']
    search_fields = ['usuario__username', 'usuario__email']
    list_filter = ['criado_em']
```

---

## 🚀 PASSO 14: Executando o Projeto

### 14.1 Execute as migrações finais
```bash
python manage.py makemigrations
python manage.py migrate
```

### 14.2 Crie categorias padrão
```bash
python manage.py shell
```

No shell do Django, execute:
```python
from transactions.models import Categoria

# Categorias de receita
Categoria.objects.create(nome='Salário', tipo='receita', cor='#28a745', icone='fas fa-money-bill-wave')
Categoria.objects.create(nome='Freelance', tipo='receita', cor='#17a2b8', icone='fas fa-laptop-code')
Categoria.objects.create(nome='Investimentos', tipo='receita', cor='#6f42c1', icone='fas fa-chart-line')

# Categorias de despesa
Categoria.objects.create(nome='Alimentação', tipo='despesa', cor='#fd7e14', icone='fas fa-utensils')
Categoria.objects.create(nome='Transporte', tipo='despesa', cor='#6c757d', icone='fas fa-car')
Categoria.objects.create(nome='Moradia', tipo='despesa', cor='#e83e8c', icone='fas fa-home')
Categoria.objects.create(nome='Saúde', tipo='despesa', cor='#dc3545', icone='fas fa-heartbeat')
Categoria.objects.create(nome='Educação', tipo='despesa', cor='#20c997', icone='fas fa-graduation-cap')

exit()
```

### 14.3 Execute o servidor
```bash
python manage.py runserver
```

Acesse: http://127.0.0.1:8000

---

## 🎯 PRÓXIMOS PASSOS

Agora que você tem a base do projeto, pode implementar:

1. **Relatórios avançados**
2. **Exportação para Excel/PDF**
3. **Metas financeiras**
4. **Notificações**
5. **API REST**
6. **Testes automatizados**
7. **Deploy em produção**

---

## 🐛 Solução de Problemas Comuns

### Erro de migração
```bash
python manage.py makemigrations --empty nome_do_app
```

### Erro de arquivos estáticos
```bash
python manage.py collectstatic
```

### Erro de permissões
Certifique-se de que o usuário está logado antes de acessar views protegidas.

### Erro de templates
Verifique se o caminho dos templates está correto no `settings.py`.

---

## 📚 Conceitos Django Aprendidos

- ✅ Estrutura de projeto Django
- ✅ Apps e modularização
- ✅ Models e relacionamentos
- ✅ Views baseadas em função
- ✅ Templates e herança
- ✅ Formulários Django
- ✅ Sistema de autenticação
- ✅ Arquivos estáticos e mídia
- ✅ Interface administrativa
- ✅ URLs e roteamento
- ✅ Migrações de banco
- ✅ Signals do Django

---

## 🎉 Parabéns!

Você criou um sistema completo de controle financeiro com Django! Continue praticando e expandindo o projeto.

**Lembre-se:** A prática leva à perfeição. Experimente, modifique e adicione novas funcionalidades!