'use strict';

exports.form = (req, res) => {
  const result = req.session.result || '';
  const action = req.session.action || 'No action performed';
  req.session.result = undefined;
  req.session.action = undefined;
  res.render('post', { title: 'Encrypt/Decrypt Helper', result, action });
};

exports.submit = (req, res) => {
  const data = req.body.entry;

  if ('encrypt' in req.body) {
    const result = data.value.toUpperCase();
    req.session.result = result;
    req.session.action = `Result of encrypting "${ data.value }"`;
    req.session.messages.push({ type: 'success', string: `Successfully encrypted value` });
  } else {
    const result = data.value.toLowerCase();
    req.session.result = result;
    req.session.action = `Result of decrypting "${ data.value }"`;
    req.session.messages.push({ type: 'success', string: 'Successfully decrypted value' });
  }

  // if any errors
  // req.session.messages.push({ type: 'error', string: `Could not apply operation: ${ e }` });

  res.redirect('back');
};