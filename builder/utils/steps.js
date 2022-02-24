const colors = require('colors/safe');

module.exports = async function (steps) {
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const index = i + 1;
    console.log(colors.green(`Step ${index}/${steps.length}: ${step.name}`));
    await step.fn();
  }
  console.log(colors.green(`All steps Done.`));
}
