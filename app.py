
from flask import Flask
import twilio.twiml
import messenger
app = Flask(__name__)


@app.route("/", methods=['GET', 'POST'])
def hello_monkey():
    return "hello"

@app.route('/send/<message>')
def sender(message):
    numbers = ["+13174183511"]
    for number in numbers:
        print("Message sent to "+ number)
        messenger.send(number, message)
    return message


if __name__ == '__main__':
    app.run(debug=True)
    

