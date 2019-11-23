export default class WebSocket {
    setGlobalEventBus(globalEventBus){
        this._globalEventBus = globalEventBus;
        this._ws = new WebSocket("ws:");
    }

    _handleMessage = (data) => {

    }

    _sendMessage = (message) => {
        if (!this._ws.readyState){
            console.log("Socket is not opened!")
        } else {
            this._ws.send(message);
            alert("Message sent!");
        }
    }

    _closeSocket = () => {
        this._ws.close();
    }
}
