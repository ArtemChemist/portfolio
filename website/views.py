from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from .models import Note
from . import db
import json
from .app import app

import jinja2
import os
from jinja2 import Template

views = Blueprint('views', __name__)

@views.route('/', methods = ['GET', 'POST'])
#@login_required
def home():
    if request.method == 'POST':
        note = request.form.get('note')
        if len(note) <1:
            flash('Note too short', category = "error")
        else:
            new_note = Note(data = note, user_id = current_user.id)
            db.session.add(new_note)
            db.session.commit()
            flash('Note added!', category = 'success')
    return render_template("home.html", user = current_user)

@views.route('/delete-note', methods = ['POST'])
def delete_note():
    data = json.loads(request.data)
    print(data)
    noteId = data['noteId']
    note = Note.query.get(noteId)
    if note:
        if note.user_id == current_user.id:
            db.session.delete(note)
            db.session.commit()
    return jsonify({})


@views.route('/print', methods = ['GET', 'POST'])
def print():

    app.jinja_loader
    latex_jinja_env = jinja2.Environment(
    block_start_string = '\BLOCK{',
    block_end_string = '}',
    variable_start_string = '\VAR{',
    variable_end_string = '}',
    comment_start_string = '\#{',
    comment_end_string = '}',
    line_statement_prefix = '%%',
    line_comment_prefix = '%#',
    trim_blocks = True,
    autoescape = False,
    loader = app.jinja_loader
    )
    pt = 'invoice.tex'
    template = latex_jinja_env.get_template(pt)
    output = template.render(section1='Long Form', section2='Short Form')
    print(output)
