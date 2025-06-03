# ROPZ - Rede de Observação de Zonas Quentes

### Integrantes do grupo:
- Diego Costa Silva | RM552648
- Lucas Minozzo Bronzeri | RM553745
- Thais Ribeiro Asfur | RM553870

## Problema
Com o avanço das mudanças climáticas, eventos de calor extremo
tornaram-se mais frequentes e intensos, impactando diretamente a
saúde pública. Grupos vulneráveis, como crianças, idosos e pessoas
com doenças crônicas, são especialmente suscetíveis a condições
como desidratação, insolação e agravamento de doenças
respiratórias.

Entretanto, a maioria das pessoas não recebe alertas preventivos
eficazes, nem possui informações suficientes sobre como agir
adequadamente para reduzir os riscos associados a temperaturas
elevadas.

## Solução
O Ropz é um sistema inteligente de monitoramento e alerta que visa
proteger vidas através do envio de notificações personalizadas
sobre condições de calor extremo, baseando-se na localização do
usuário (CEP ou bairro).
A solução se apoia em três pilares principais:
Monitoramento: coleta dados meteorológicos de fontes externas e
sensores simulados, utilizando Inteligência Artificial para prever
riscos e identificar situações críticas

- **[Backend Java](https://github.com/DiegoCostaCode/GS-Ropz.git)**
- **[Pitch](https://youtu.be/O1Hr3DbmBR4)**
- **[Vídeo teste](https://youtu.be/sTmlxgzPeO0)**

## Design
![frame-app-design](https://github.com/user-attachments/assets/bf49c145-0868-40f1-b823-1e8f0a4384b9)

## Tenologias

```js
"dependencies": {
    "@expo/vector-icons": "^14.1.0",
    "@react-native-async-storage/async-storage": "^2.1.2",
    "axios": "^1.9.0",
    "expo": "~53.0.9",
    "expo-constants": "~17.1.6",
    "expo-linking": "~7.1.5",
    "expo-router": "~5.0.7",
    "expo-status-bar": "~2.2.3",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "react-native": "0.79.2",
    "react-native-safe-area-context": "5.4.0",
    "react-native-screens": "~4.10.0",
    "react-native-web": "^0.20.0"
  },
```
## Instruções de uso

1. **Clone o backend Java, e siga as instruções no [repositório](https://github.com/DiegoCostaCode/GS-Ropz.git)**

2. **Clone este projeto:**
     ```bash
    git clone https://github.com/DiegoCostaCode/GS-ropz-app.git
    ```
     ```
     cd cd GS-ropz-app
    ```
3. **Instale o Expo CLI globalmente (caso ainda não tenha):**
    ```bash
       npm install -g expo-cli
    ```
4. **Instale as dependências:**
    ```bash
      npm install
    ```
5. **Inicie o projeto**
    ```bash
      npm start
    ```



