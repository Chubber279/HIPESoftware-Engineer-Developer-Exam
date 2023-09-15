from flask import Flask, request, jsonify
import json
from datetime import datetime
from flask_cors import CORS
import uuid

app = Flask(__name__)

CORS(app)

# Events list
events = []

# JSON File
eventsFile = 'events.json'

# Load JSON File
try:
    with open(eventsFile, "r") as fp:
        events = json.load(fp)
except FileNotFoundError:
    pass

def save_events_data():
    with open(eventsFile, 'w') as file:
        json.dump(events, file)


def find_event_by_id(event_id):
    for event in events:
        if event['id'] == event_id:
            return event
    return None

def has_overlap(new_event):
    for event in events:
        if (new_event['start_time'] < event['end_time']) and (new_event['end_time'] > event['start_time']):
            return True
    return False


@app.route('/events', methods=['POST'])
def create_event():
    data = request.get_json()


    start_time = int(datetime.strptime(data['start_time'], '%Y-%m-%dT%H:%M').timestamp())
    end_time = int(datetime.strptime(data['end_time'], '%Y-%m-%dT%H:%M').timestamp())

    # Check if event is in the past
    if start_time < int(datetime.now().timestamp()):
        return jsonify({'message': 'Event cannot be in the past'}), 400

    new_event = {
        'id': str(uuid.uuid4()),
        'name': data['name'],
        'description': data['description'],
        'start_time': str(start_time),
        'end_time': str(end_time)
    }

    # Check for overlapping events
    if has_overlap(new_event):
        return jsonify({'message': 'Event time overlaps with an existing event'}), 400

    events.append(new_event)
    save_events_data()
    return jsonify({'message': 'Event created successfully'})

# Get all Events
@app.route('/events', methods=['GET'])
def get_events():
    return jsonify(events)

# Get Event
@app.route('/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = find_event_by_id(event_id)
    if event:
        return jsonify(event)
    else:
        return jsonify({'message': 'Event not found'}), 404

# Update Event
@app.route('/events/<int:event_id>', methods=['PUT'])
def update_event(event_id):
    data = request.get_json()
    event = find_event_by_id(event_id)
    if event:
        event['name'] = data['name']
        event['description'] = data['description']
        save_events_data()
        return jsonify({'message': 'Event updated successfully'})
    else:
        return jsonify({'message': 'Event not found'}), 404

# Delete Event
@app.route('/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    event = find_event_by_id(event_id)
    if event:
        events.remove(event)
        save_events_data()
        return jsonify({'message': 'Event deleted successfully'})
    else:
        return jsonify({'message': 'Event not found'}), 404

@app.route('/')
def hello():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
