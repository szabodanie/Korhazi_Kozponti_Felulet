using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class KorhaziSzemelyek
{
    public int? Id { get; set; }

    public string? Vezeteknev { get; set; }

    public string? Keresztnev { get; set; }

    public string? Panasz { get; set; }

    public int? tbkartya { get; set; }

    public string? felhasznalonev { get; set; }

    public string? email { get; set; }

    


}
