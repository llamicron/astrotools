// command = {
//   name: '-someCommand',
//   description: '',
//   cmdOverride: '',
//   cmd: function () {
//     cmd = this.name;
//     for (let i = 0; i < this.arguments.length; i++) {
//       const arg = this.arguments[i];
//       cmd += " " + arg.value();
//     }
//     return cmd;
//   },
//   arguments: [
//     // Args go here
//   ]
// }
//
// text = {
//   name: 'a text input field',
//   description: '',
//   type: 'text',
//   value: function() {
//     return this.rawValue;
//   },
//   rawValue: '',
//   placeholder: '',
//   index: 0,
// }

// checkbox = {
//   name: 'a checkbox field',
//   description: '',
//   type: 'checkbox',
//   value: function () {
//     return this.rawValue;
//   },
//   rawValue: false,
//   index: 0
// }

// select = {
//   name: 'a select field',
//   description: '',
//   type: 'select',
//   value: function () {
//     return this.rawValue;
//   },
//   rawValue: "",
//   options: ["option 1", "option 2", "option 3"],
//   index: 0
// }

function boolToInt(bool) {
  if (bool) {
    return "1";
  } else {
    return "0";
  }
}

vartools = {
  commands: [
    {
      name: "BLS",
      description: "Perform the Box-Least Squares (BLS) transit search algorithm on the light curves",
      cmdOverride: "",
      index: null,
      cmd: function () {
        if (this.cmdOverride.length > 0) {
          return this.cmdOverride;
        }

        cmd = '-' + this.name;
        for (let i = 0; i < this.arguments.length; i++) {
          const arg = this.arguments[i];
          cmd += " " + arg.value();
        }

        return cmd.replace(/ +(?= )/g, '');
      },
      arguments: [
        {
          name: "r",
          description: "Minimum and maximum stellar radius r to consider (in solar radii). Should not be used with 'q' or 'density'",
          type: 'text',

          value: function () {
            if (this.rawValue.length > 0) {
              return this.name + " " + this.rawValue;
            } else {
              return "";
            }
          },
          rawValue: "",
          placeholder: "rmin rmax",
          index: 0,
        },
        {
          name: "q",
          description: "Fixed minimum and maximum q (fraction of orbit in transit) for the search. Should not be used with 'r' or 'density'",
          type: 'text',

          value: function () {
            if (this.rawValue.length > 0) {
              return this.name + " " + this.rawValue;
            } else {
              return "";
            }
          },
          rawValue: "",
          placeholder: "qmin qmax",
          index: 0,
        },
        {
          name: "density",
          description: "stellar density (in grams per cubic centimeter) and a minimum and maximum fraction of the expected transit duration (assuming a circular orbit). Should not be used with 'r' or 'q'",
          type: 'text',

          value: function () {
            if (this.rawValue.length > 0) {
              return this.name + " " + this.rawValue;
            } else {
              return "";
            }
          },
          rawValue: "",
          placeholder: "rho minexpdurfrac maxexpdurfrac",
          index: 0,
        },
        {
          name: "minper",
          description: "Minimum periods to search in days",
          type: 'text',

          value: function () {
            return this.rawValue;
          },
          rawValue: "",
          placeholder: "minper",
          index: 1,
        },
        {
          name: "maxper",
          description: "Maximum periods to search in days",
          type: 'text',

          value: function () {
            return this.rawValue;
          },
          rawValue: "",
          placeholder: "maxper",
          index: 2,
        },
        {
          name: "nfreq",
          description: "Number of trial frequencies to scan",
          type: 'text',

          value: function () {
            return this.rawValue;
          },
          rawValue: "",
          placeholder: "nfreq",
          index: 3,
        },
        {
          name: "nbins",
          description: "Number of phase bins to break the light curve into (this should be at least 2/qmin)",
          type: 'text',

          value: function () {
            return this.rawValue;
          },
          rawValue: "",
          placeholder: "nbins",
          index: 4
        },
        {
          name: "timezone",
          description: "Number (in hours) to add to add to UTC to get the local time",
          type: 'text',

          value: function () {
            return this.rawValue;
          },
          rawValue: "",
          placeholder: "timezone",
          index: 5
        },
        {
          name: "Npeak",
          description: "number of peaks in the BLS spectrum to find and report",
          type: 'text',

          value: function () {
            return this.rawValue;
          },
          rawValue: "",
          placeholder: "Npeak",
          index: 6
        },
        {
          name: "outperiodogrom",
          description: "Select to output the BLS period vs. SN spectrum",
          type: 'checkbox',

          value: function () {
            return boolToInt(this.rawValue);
          },
          rawValue: false,
          index: 7,
        },
        {
          name: "outdir",
          description: 'output directory for the BLS spectrum if outperiodogram is selected, ".bls" will be appended to the filename',
          type: 'text',

          value: function () {
            return this.rawValue;
          },
          rawValue: "{outdir}",
          placeholder: "outdir",
          index: 8,
        },
        {
          name: "omodel",
          description: 'Select to output the model for the light curve, the output directory is then given in modeloutdir (the next argument), the suffix ".bls.model" will be appended to the filename.',
          type: 'checkbox',

          value: function () {
            return boolToInt(this.rawValue);
          },
          rawValue: false,
          index: 9,
        },
        {
          name: "modeloutdir",
          description: 'Output directory for omodel ".bls.model" files, if omodel is selected',
          type: 'text',

          value: function () {
            return this.rawValue;
          },
          rawValue: "{outdir}",
          placeholder: "modeloutdir",
          index: 10
        },
        {
          name: "correctlc",
          description: "Will subtract the transit model from the light curve before passing it to the next command",
          type: 'checkbox',

          value: function () {
            return boolToInt(this.rawValue);
          },
          rawValue: false,
          index: 11,
        },
        {
          name: "fittrap",
          description: "fit a trapezoidal transit to each BLS pea",
          type: 'checkbox',

          value: function () {
            if (this.rawValue) {
              return "fittrap";
            } else {
              return "";
            }
          },
          rawValue: false,
          index: 12,
        },
        {
          name: "nobinnedrms",
          description: "Procedure runs faster, but the SN will tend to be suppressed for high significance detections",
          type: 'checkbox',

          value: function () {
            if (this.rawValue) {
              return "nobinnedrms";
            } else {
              return "";
            }
          },
          rawValue: false,
          index: 13,
        },
        {
          name: "ophcurve",
          description: "model phase curve will be output to a file in the directory outdir with suffix '.bls.phcurve'. It will be generated with phases between phmin and phmax and a uniform step size of phstep.",
          type: 'text',

          value: function () {
            return this.rawValue;
          },
          rawValue: "",
          placeholder: "outdir phmin phmax phstep",
          index: 14,
        },
        {
          name: "ojdcurve",
          description: "model light curve will be output to a file in the directory outdir with suffix '.bls.jdcurve'. The times will be between the first and last times in the light curve with a uniform step size of jdstep.",
          type: 'text',

          value: function () {
            return this.rawValue;
          },
          rawValue: "",
          placeholder: "outdir jdstep",
          index: 15,
        },
        {
          name: "uniform steps",
          description: "By default the BLS spectrum is sampled at uniform frequency steps. To sample it at uniform steps in period or log(period) use the 'stepP' or 'steplogP' keyword.",
          type: 'select',

          value: function () {
            if (this.rawValue == "Uniform Frequency Steps (Default)") {
              return "";
            } else {
              return this.rawValue
            }
          },
          rawValue: "Uniform Frequency Steps (Default)",
          options: ["Uniform Frequency Steps (Default)", "stepP", "steplogP"],
          index: 16,
        },
        {
          name: "adjust-qmin-by-mindt",
          description: "Adaptively set the minimum q value to the maximum of qmin or mindt*frequency where mindt is the minimum time difference between consecutive points in the light curve",
          type: 'text',

          value: function () {
            return this.rawValue;
          },
          rawValue: "",
          placeholder: "adjust-qmin-by-mindt",
          index: 17,
        },
        {
          name: "reduce-nbins",
          description: "Adaptively reduce the number of phase bins at each frequency such that there are no more than 2 bins to sample a transit of duration qmin",
          type: 'checkbox',

          value: function () {
            if (this.rawValue) {
              return "reduce-nbins";
            } else {
              return "";
            }
          },
          rawValue: false,
          index: 18,
        },
        {
          name: "reportharmonics",
          description: "Report harmonic frequencies",
          type: 'checkbox',

          value: function () {
            if (this.rawValue) {
              return "reportharmonics";
            } else {
              return "";
            }
          },
          rawValue: false,
          index: 19,
        },
      ]
    },
    {
      name: "LS",
      description: "Perform a Generalized Lomb-Scargle (L-S) search of the light curves for periodic sinusoidal signals",
      cmdOverride: "",
      index: null,
      cmd: function () {
        if (this.cmdOverride.length > 0) {
          return this.cmdOverride;
        }

        cmd = '-' + this.name;
        for (let i = 0; i < this.arguments.length; i++) {
          const arg = this.arguments[i];
          cmd += " " + arg.value();
        }

        return cmd.replace(/ +(?= )/g, '');
      },
      arguments: [
        {
          name: "minp",
          description: "The search is done over frequencies between fmin = 1/maxp to fmax = 1/minp",
          type: 'text',
          value: function () {
            return this.rawValue;
          },
          rawValue: "",
          placeholder: "minp",
          index: 0,
        },
        {
          name: "maxp",
          description: "The search is done over frequencies between fmin = 1/maxp to fmax = 1/minp",
          type: 'text',
          value: function () {
            return this.rawValue;
          },
          rawValue: "",
          placeholder: "maxp",
          index: 1,
        },
        {
          name: "subsample",
          description: "uniform frequency step-size of Δf = subsample/T, where T is the time-span of the observations.",
          type: 'text',
          value: function () {
            return this.rawValue;
          },
          rawValue: "",
          placeholder: "subsample",
          index: 2,
        },
        {
          name: "Npeaks",
          description: "find the Npeaks strongest peaks in the L-S periodogram.",
          type: 'text',
          value: function () {
            return this.rawValue;
          },
          rawValue: "",
          placeholder: "Npeaks",
          index: 3,
        },
        {
          name: "operiodogram",
          description: "operiodogram is a flag that is either 1 to output the periodogram for each light curve to a separate file, or 0 not to.",
          type: 'checkbox',
          value: function () {
            if (this.rawValue) {
              return "1";
            } else {
              return "0";
            }
          },
          rawValue: false,
          index: 4,
        },
        {
          name: "outdir",
          description: "Output directory for previous option.",
          type: 'text',
          value: function () {
            return this.rawValue;
          },
          rawValue: "{outdir}",
          placeholder: "{outdir}",
          index: 5,
        },
        {
          name: "noGLS",
          description: 'By default the Generalized Lomb-Scargle periodogram due to Zechmeister and Kürster 2009, A&A, 496, 577 is calculated. Check to compute the traditional periodogram',
          type: 'checkbox',
          value: function () {
            if (this.rawValue) {
              return this.name;
            } else {
              return '';
            }
          },
          rawValue: false,
          index: 6
        },
        {
          name: "whiten",
          description: "the light curve will be whitened at each peak period and the periodogram will be recomputed before searching for the next peak period.",
          type: 'checkbox',
          value: function () {
            if (this.rawValue) {
              return this.name;
            } else {
              return '';
            }
          },
          rawValue: false,
          index: 7
        },
        {
          name: "'clip' clip clipiter",
          description: "change the clipping parameters for calculating the average and RMS of the power spectrum when computing the SNR value of a peak. clip is the sigma-clipping factor, and clipiter is a flag that is 1 or 0 to toggle iterative clipping.",
          type: 'text',
          value: function () {
            return this.rawValue;
          },
          rawValue: "",
          placeholder: "'clip' clip clipiter",
          index: 8,
        },
      ]
    }
  ],
  flags: [
    {
      name: "-alarm",
      description: "Calculate the alarm variability statistic for each light curve.",
      type: 'checkbox',
      value: function () {
        if (this.rawValue) {
          return this.name;
        } else {
          return "";
        }
      },
      rawValue: false,
    },
    {
      name: "-changeerror",
      description: "Replace the formal errors in a light curve with the RMS of the light curve",
      type: 'checkbox',
      value: function () {
        if (this.rawValue) {
          return this.name;
        } else {
          return "";
        }
      },
      rawValue: false
    },
    {
      name: "-chi2",
      description: "Calculate χ² per degree of freedom for the light curves. The output will include χ²/dof and the error weighted mean magnitude",
      type: 'checkbox',
      value: function () {
        if (this.rawValue) {
          return this.name;
        } else {
          return "";
        }
      },
      rawValue: false,
    },
    {
      name: "-rescalesig",
      description: "Rescale the magnitude uncertainties of each light curve so that χ²/dof = 1 for every light curve. The rescale factor for each light curve will be included in the output table.",
      type: 'checkbox',
      value: function () {
        if (this.rawValue) {
          return this.name;
        } else {
          return "";
        }
      },
      rawValue: false,
    },
    {
      name: "-rms",
      description: "Calculate the RMS of the light curves. The output will include RMS, the mean magnitude, the expected RMS and the number of points in the light curve.",
      type: 'checkbox',
      value: function () {
        if (this.rawValue) {
          return this.name;
        } else {
          return "";
        }
      },
      rawValue: false,
    },
    {
      name: "-savelc",
      description: "This command can be used in conjunction with the -restorelc command to save a light curve and later restore it to this state.",
      type: 'checkbox',
      value: function () {
        if (this.rawValue) {
          return this.name;
        } else {
          return "";
        }
      },
      rawValue: false,
    },
    {
      name: "-basename",
      description: "Use this option to print only the basename of each light curve in the output table.",
      type: 'checkbox',
      value: function () {
        if (this.rawValue) {
          return this.name;
        } else {
          return "";
        }
      },
      rawValue: false,
    },
    {
      name: "-binaryperiodogram",
      description: "This option causes periodograms to be output in binary format rather than the default ascii format. The binary file will start with an integer giving the number of elements Nelem in the periodogram, followed by double arrays of size Nelem, one for each column included in the ascii version of the periodogram.",
      type: 'checkbox',
      value: function () {
        if (this.rawValue) {
          return this.name;
        } else {
          return "";
        }
      },
      rawValue: false,
    },
    {
      name: "-header",
      description: "Use this option to provide a one line header at the start of the output table.",
      type: 'checkbox',
      value: function () {
        if (this.rawValue) {
          return this.name;
        } else {
          return "";
        }
      },
      rawValue: false,
    },
    {
      name: "-headeronly",
      description: "Use this option to output the header and then quit without processing any light curves.",
      type: 'checkbox',
      value: function () {
        if (this.rawValue) {
          return this.name;
        } else {
          return "";
        }
      },
      rawValue: false,
    },
    {
      name: "-log-command-line",
      description: "Print the command-line syntax given to VARTOOLS as a comment to the output ascii table, before giving the header.",
      type: 'checkbox',
      value: function () {
        if (this.rawValue) {
          return this.name;
        } else {
          return "";
        }
      },
      rawValue: false,
    },
    {
      name: "-matchstringid",
      description: "If this option is specified then commands that require matching different points from the same image, will do so using a string-id for each image rather than by comparing the JD values. If this option is set then the id column for each light curve must be specified with the -inputlcformat option.",
      type: 'checkbox',
      value: function () {
        if (this.rawValue) {
          return this.name;
        } else {
          return "";
        }
      },
      rawValue: false,
    },
    {
      name: "-nobuffer",
      description: "If this is specified then stdout will not be buffered, by default it is buffered.",
      type: 'checkbox',
      value: function () {
        if (this.rawValue) {
          return this.name;
        } else {
          return "";
        }
      },
      rawValue: false,
    },
    {
      name: "-noskipempty",
      description: "By default empty light curves are skipped and not included in the output table. To not skip these, and include them in the output, give this option. Note that this option does not have an effect if the -readall option is used.",
      type: 'checkbox',
      value: function () {
        if (this.rawValue) {
          return this.name;
        } else {
          return "";
        }
      },
      rawValue: false,
    },
    {
      name: "-numbercolumns",
      description: "Prefix each column name in the header with its column number.",
      type: 'checkbox',
      value: function () {
        if (this.rawValue) {
          return this.name;
        } else {
          return "";
        }
      },
      rawValue: false,
    },
    {
      name: "-oneline",
      description: "Output each statistic on a separate line rather than using the default of outputing a table. This option can provide more readable output when processing a single light curve. Its use is not suggested when processing a list of light curves",
      type: 'checkbox',
      value: function () {
        if (this.rawValue) {
          return this.name;
        } else {
          return '';
        }
      },
      rawValue: false,
    },
    {
      name: "-quiet",
      description: "If this is specified the output table will not be generated, however any calls to output light curves, periodograms etc. will still be executed.",
      type: 'checkbox',
      value: function () {
        if (this.rawValue) {
          return this.name;
        } else {
          return '';
        }
      },
      rawValue: false,
    },
    {
      name: "-readall",
      description: "Use this option to force the program to read in all the light curves at once. If not specified, this mode will only be used if a command that requires storing all the light curves in memory is issued.",
      type: 'checkbox',
      value: function () {
        if (this.rawValue) {
          return this.name;
        } else {
          return '';
        }
      },
      rawValue: false,
    },
    {
      name: "-showinputlcformat",
      description: "Print the expected format of the input light curve(s) and exit.",
      type: 'checkbox',
      value: function () {
        if (this.rawValue) {
          return this.name;
        } else {
          return '';
        }
      },
      rawValue: false,
    },
    {
      name: "-showinputlistformat",
      description: "Print the expected format of the input light curve list and exit. This command was called -inputlistformat in older versions of VARTOOLS.",
      type: 'checkbox',
      value: function () {
        if (this.rawValue) {
          return this.name;
        } else {
          return '';
        }
      },
      rawValue: false,
    },
    {
      name: "-skipmissing",
      description: "Do not abort if a missing or unreadable light curve file is encountered. Instead skip the light curve and proceed with others in the list.",
      type: 'checkbox',
      value: function () {
        if (this.rawValue) {
          return this.name;
        } else {
          return '';
        }
      },
      rawValue: false,
    },
    {
      name: "-tab",
      description: "Use this option to use a tab-delimited starbase format for the output table rather than the default space-delimited format.",
      type: 'checkbox',
      value: function () {
        if (this.rawValue) {
          return this.name;
        } else {
          return '';
        }
      },
      rawValue: false,
    },
  ]
}
