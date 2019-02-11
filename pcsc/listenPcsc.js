#!/usr/bin/env node

var pcsc = require('pcsclite');
const fetch = require('isomorphic-fetch');
function buf2hex(buffer) {
  return Array.prototype.map
    .call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2))
    .splice(0, 4)
    .join('');
}

var pcsc = pcsc();
pcsc.on('reader', function(reader) {
  console.log('New reader detected', reader.name);

  reader.on('error', function(err) {
    console.log('Error(', this.name, '):', err.message);
  });

  reader.on('status', function(status) {
    console.log('Status(', this.name, '):', status);
    var changes = this.state ^ status.state;
    if (changes) {
      if (
        changes & this.SCARD_STATE_EMPTY &&
        status.state & this.SCARD_STATE_EMPTY
      ) {
        console.log('card removed');
        reader.disconnect(reader.SCARD_LEAVE_CARD, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log('Disconnected');
          }
        });
      } else if (
        changes & this.SCARD_STATE_PRESENT &&
        status.state & this.SCARD_STATE_PRESENT
      ) {
        console.log('card inserted'); /* card inserted */
        reader.connect({ share_mode: this.SCARD_SHARE_SHARED }, function(
          err,
          protocol,
        ) {
          if (err) {
            console.log(err);
          } else {
            //
            console.log('Protocol(', reader.name, '):', protocol);
            reader.transmit(
              Buffer.from([0xff, 0xca, 0x00, 0x00, 0x00]),
              7,
              protocol,
              async function(err, data) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('Data received', data);
                  const hex = buf2hex(data);
                  console.log('hex', hex);
                  const number = parseInt(hex, 16);
                  console.log('num', number);
                  try {
                    await fetch(
                      `http://localhost:3000/card_recorder?id=${number}`,
                    );
                  } catch (err) {
                    console.log('Piece of shit');
                    console.error(err);
                  }
                }
              },
            );
          }
        });
      }
    }
  });

  reader.on('end', function() {
    console.log('Reader', this.name, 'removed');
  });
});

pcsc.on('error', function(err) {
  console.log('PCSC error', err.message);
});
