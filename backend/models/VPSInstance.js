const mongoose = require('mongoose');
const crypto = require('crypto');

// Chave simétrica de 32 bytes (256 bits)
const RAW_KEY = process.env.ENCRYPTION_SECRET || 'orbizone_default_secure_key_2026_x';
const ENCRYPTION_KEY = crypto.createHash('sha256').update(RAW_KEY).digest();
const IV_LENGTH = 16;

function encryptPassword(text) {
    if (!text) return '';
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

const vpsInstanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  region: { type: String, required: true, enum: ['America', 'Europe', 'Brazil'] },
  ipAddress: { type: String, default: '0.0.0.0' },
  rootPassword: { 
    type: String, 
    default: '',
    set: encryptPassword // Criptografa automaticamente ao salvar no Mongo
  },
  os: { type: String, required: true },
  plan: { type: String, required: true },
  hostname: { type: String, default: '' },
  price: { type: Number, default: 0 },
  hasBackup: { type: Boolean, default: false },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'active', 'suspended', 'cancelled'], 
    default: 'pending' 
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentId: { type: String, default: '' },
  paymentMethod: { type: String, default: '' },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

vpsInstanceSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model('VPSInstance', vpsInstanceSchema);
