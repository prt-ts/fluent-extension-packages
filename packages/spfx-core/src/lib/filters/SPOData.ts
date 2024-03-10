/* eslint-disable */
type KeysMatching<T, V> = { [K in keyof T]-?: T[K] extends V ? K : never }[keyof T];

enum FilterOperation {
    Equals = "eq",
    NotEquals = "ne",
    GreaterThan = "gt",
    GreaterThanOrEqualTo = "ge",
    LessThan = "lt",
    LessThanOrEqualTo = "le",
    StartsWith = "startswith",
    SubstringOf = "substringof"
}

enum FilterJoinOperator {
    And = "and",
    AndWithSpace = " and ",
    Or = "or",
    OrWithSpace = " or "
}

export class SPOData {
    static Where<T = any>() {
      // eslint-disable-next-line
      return new QueryableGroups<T>();
    }
}

class BaseQuery<TBaseInterface> {
    protected query: string[] = [];

    constructor(query: string[]) {
        this.query = query;
    }
}


class QueryableFields<TBaseInterface> extends BaseQuery<TBaseInterface> {
    constructor(q: string[]) {
        super(q);
    }

    public TextField(InternalName: KeysMatching<TBaseInterface, string>): TextField<TBaseInterface> {
        return new TextField<TBaseInterface>([...this.query, (InternalName as string)]);
    }

    public ChoiceField(InternalName: KeysMatching<TBaseInterface, string>): TextField<TBaseInterface> {
        return new TextField<TBaseInterface>([...this.query, (InternalName as string)]);
    }

    public MultiChoiceField(InternalName: KeysMatching<TBaseInterface, string[]>): TextField<TBaseInterface> {
        return new TextField<TBaseInterface>([...this.query, (InternalName as string)]);
    }

    public NumberField(InternalName: KeysMatching<TBaseInterface, number>): NumberField<TBaseInterface> {
        return new NumberField<TBaseInterface>([...this.query, (InternalName as string)]);
    }

    public DateField(InternalName: KeysMatching<TBaseInterface, Date>): DateField<TBaseInterface> {
        return new DateField<TBaseInterface>([...this.query, (InternalName as string)]);
    }

    public BooleanField(InternalName: KeysMatching<TBaseInterface, boolean>): BooleanField<TBaseInterface> {
        return new BooleanField<TBaseInterface>([...this.query, (InternalName as string)]);
    }

    public LookupField<TKey extends KeysMatching<TBaseInterface, object>>(InternalName: TKey): LookupQueryableFields<TBaseInterface, TBaseInterface[TKey]> {
        return new LookupQueryableFields<TBaseInterface, TBaseInterface[TKey]>([...this.query], InternalName as string);
    }

    public LookupIdField<TKey extends KeysMatching<TBaseInterface, number>>(InternalName: TKey): NumberField<TBaseInterface> {
        const col: string = (InternalName as string).endsWith("Id") ? InternalName as string : `${InternalName as string}Id`;
        return new NumberField<TBaseInterface>([...this.query, col]);
    }
}

class LookupQueryableFields<TBaseInterface, TExpandedType> extends BaseQuery<TExpandedType>{
    private LookupField: string;
    constructor(q: string[], LookupField: string) {
        super(q);
        this.LookupField = LookupField;
    }

    public Id(Id: number): ComparisonResult<TBaseInterface> {
      // eslint-disable-next-line
      return new ComparisonResult<TBaseInterface>([
        ...this.query,
        `${this.LookupField}/Id`,
        FilterOperation.Equals,
        Id.toString(),
      ]);
    }

    public TextField(InternalName: KeysMatching<TExpandedType, string>): TextField<TBaseInterface> {
      // eslint-disable-next-line
      return new TextField<TBaseInterface>([
        ...this.query,
        `${this.LookupField}/${InternalName as string}`,
      ]);
    }

    public NumberField(InternalName: KeysMatching<TExpandedType, number>): NumberField<TBaseInterface> {
      // eslint-disable-next-line
      return new NumberField<TBaseInterface>([
        ...this.query,
        `${this.LookupField}/${InternalName as string}`,
      ]);
    }

    // Support has been announced, but is not yet available in SharePoint Online
    // https://www.microsoft.com/en-ww/microsoft-365/roadmap?filters=&searchterms=100503
    // public BooleanField(InternalName: KeysMatching<tExpandedType, boolean>): BooleanField<tBaseObjectType> {
    //     return new BooleanField<tBaseObjectType>([...this.query, `${this.LookupField}/${InternalName as string}`]);
    // }
}

class QueryableGroups<TBaseInterface> extends QueryableFields<TBaseInterface>{
    constructor() {
        super([]);
    }

    public All(queries: ComparisonResult<TBaseInterface>[]): ComparisonResult<TBaseInterface> {
        // eslint-disable-next-line
        return new ComparisonResult<TBaseInterface>([`(${queries.map(x => x.ToString()).join(FilterJoinOperator.AndWithSpace)})`]);
    }

    public Some(queries: ComparisonResult<TBaseInterface>[]): ComparisonResult<TBaseInterface> {
      // eslint-disable-next-line
      return new ComparisonResult<TBaseInterface>([
        `(${queries
          .map((x) => x.ToString())
          .join(FilterJoinOperator.OrWithSpace)})`,
      ]);
    }
}


class ComparisonResult<TBaseInterface> extends BaseQuery<TBaseInterface> {
  constructor(q: string[]) {
    super(q);
  }

  public Or(): QueryableFields<TBaseInterface> {
    return new QueryableFields<TBaseInterface>([
      ...this.query,
      FilterJoinOperator.Or,
    ]);
  }

  public And(): QueryableFields<TBaseInterface> {
    return new QueryableFields<TBaseInterface>([
      ...this.query,
      FilterJoinOperator.And,
    ]);
  }

  public ToString(): string {
    return this.query.join(" ");
  }
}


class NullableField<TBaseInterface, TInputValueType> extends BaseQuery<TBaseInterface>{
    protected LastIndex: number;
    protected InternalName: string;

    constructor(q: string[]) {
        super(q);
        this.LastIndex = q.length - 1
        this.InternalName = q[this.LastIndex];
    }

    protected ToODataValue(value: TInputValueType): string {
        return `'${value}'`;
    }

    public IsNull(): ComparisonResult<TBaseInterface> {
        return new ComparisonResult<TBaseInterface>([...this.query, FilterOperation.Equals, "null"]);
    }

    public IsNotNull(): ComparisonResult<TBaseInterface> {
        return new ComparisonResult<TBaseInterface>([...this.query, FilterOperation.NotEquals, "null"]);
    }
}

class ComparableField<TBaseInterface, TInputValueType> extends NullableField<TBaseInterface, TInputValueType>{
    constructor(q: string[]) {
        super(q);
    }

    public EqualTo(value: TInputValueType): ComparisonResult<TBaseInterface> {
        return new ComparisonResult<TBaseInterface>([...this.query, FilterOperation.Equals, this.ToODataValue(value)]);
    }

    public NotEqualTo(value: TInputValueType): ComparisonResult<TBaseInterface> {
        return new ComparisonResult<TBaseInterface>([...this.query, FilterOperation.NotEquals, this.ToODataValue(value)]);
    }

    public In(values: TInputValueType[]): ComparisonResult<TBaseInterface> {
        return SPOData.Where<TBaseInterface>().Some(values.map(x => this.EqualTo(x)));
    }
}

class TextField<TBaseInterface> extends ComparableField<TBaseInterface, string>{
    constructor(q: string[]) {
        super(q);
    }

    public StartsWith(value: string): ComparisonResult<TBaseInterface> {
        const filter = `${FilterOperation.StartsWith}(${this.InternalName}, ${this.ToODataValue(value)})`;
        this.query[this.LastIndex] = filter;
        return new ComparisonResult<TBaseInterface>([...this.query]);
    }

    public Contains(value: string): ComparisonResult<TBaseInterface> {
        const filter = `${FilterOperation.SubstringOf}(${this.ToODataValue(value)}, ${this.InternalName})`;
        this.query[this.LastIndex] = filter;
        return new ComparisonResult<TBaseInterface>([...this.query]);
    }
}

class BooleanField<TBaseInterface> extends NullableField<TBaseInterface, boolean>{
    constructor(q: string[]) {
        super(q);
    }

    protected override ToODataValue(value: boolean | null): string {
        return `${value == null ? "null" : value ? 1 : 0}`;
    }

    public IsTrue(): ComparisonResult<TBaseInterface> {
        return new ComparisonResult<TBaseInterface>([...this.query, FilterOperation.Equals, this.ToODataValue(true)]);
    }

    public IsFalse(): ComparisonResult<TBaseInterface> {
        return new ComparisonResult<TBaseInterface>([...this.query, FilterOperation.Equals, this.ToODataValue(false)]);
    }

    public IsFalseOrNull(): ComparisonResult<TBaseInterface> {
        const filter = `(${[this.InternalName, FilterOperation.Equals, this.ToODataValue(null), FilterJoinOperator.Or, this.InternalName, FilterOperation.Equals, this.ToODataValue(false)].join(" ")})`;
        this.query[this.LastIndex] = filter;
        return new ComparisonResult<TBaseInterface>([...this.query]);
    }
}

class NumericField<TBaseInterface, TInputValueType> extends ComparableField<TBaseInterface, TInputValueType>{
    constructor(q: string[]) {
        super(q);
    }

    public GreaterThan(value: TInputValueType): ComparisonResult<TBaseInterface> {
        return new ComparisonResult<TBaseInterface>([...this.query, FilterOperation.GreaterThan, this.ToODataValue(value)]);
    }

    public GreaterThanOrEqualTo(value: TInputValueType): ComparisonResult<TBaseInterface> {
        return new ComparisonResult<TBaseInterface>([...this.query, FilterOperation.GreaterThanOrEqualTo, this.ToODataValue(value)]);
    }

    public LessThan(value: TInputValueType): ComparisonResult<TBaseInterface> {
        return new ComparisonResult<TBaseInterface>([...this.query, FilterOperation.LessThan, this.ToODataValue(value)]);
    }

    public LessThanOrEqualTo(value: TInputValueType): ComparisonResult<TBaseInterface> {
        return new ComparisonResult<TBaseInterface>([...this.query, FilterOperation.LessThanOrEqualTo, this.ToODataValue(value)]);
    }
}


class NumberField<TBaseInterface> extends NumericField<TBaseInterface, number>{
    constructor(q: string[]) {
        super(q);
    }

    protected override ToODataValue(value: number): string {
        return `${value}`;
    }
}

class DateField<TBaseInterface> extends NumericField<TBaseInterface, Date>{
    constructor(q: string[]) {
        super(q);
    }

    protected override ToODataValue(value: Date): string {
        return `'${value.toISOString()}'`
    }

    public IsBetween(startDate: Date, endDate: Date): ComparisonResult<TBaseInterface> {
        const filter = `(${[this.InternalName, FilterOperation.GreaterThan, this.ToODataValue(startDate), FilterJoinOperator.And, this.InternalName, FilterOperation.LessThan, this.ToODataValue(endDate)].join(" ")})`;
        this.query[this.LastIndex] = filter;
        return new ComparisonResult<TBaseInterface>([...this.query]);
    }

    public IsToday(): ComparisonResult<TBaseInterface> {
        const StartToday = new Date(); StartToday.setHours(0, 0, 0, 0);
        const EndToday = new Date(); EndToday.setHours(23, 59, 59, 999);
        return this.IsBetween(StartToday, EndToday);
    }
}