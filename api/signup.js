const path = require('path');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const handlebars = require('handlebars');
const router = express.Router();

const User = require('../models/User.model')