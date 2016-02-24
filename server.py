
from flask import Flask
import twilio.twiml
import messenger
app = Flask(__name__)


@app.route("/", methods=['GET', 'POST'])
def hello_monkey():
    """Respond to incoming calls with a simple text message."""
    resp = twilio.twiml.Response()
    resp.message("Hello, Mobile Monkey")
    return str(resp)

@app.route('/send/<message>')
def sender(message):
    numbers = ["+13174183511", "+15083454942"]
    for number in numbers:
        print("Message sent to "+ number)
        messenger.send(number, message)
    return message


if __name__ == '__main__':
    app.run(debug=True)
    

